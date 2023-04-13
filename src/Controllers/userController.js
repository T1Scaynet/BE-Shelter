const User = require('../Models/userModel');
const Role = require('../Models/roleModel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
// const { verify } = require('crypto');
require('dotenv').config();

const user = {};

const getUser = (data) => {
  try {
    return User.findOne(data);
  } catch (error) {
    return false;
  }
};

// const sendMail = async(email) => {
//   const config = {
//       host: 'smtp.gmail.com',
//       port: 587,
//       auth: {
//           user: 'fundacionhenry@gmail.com',
//           pass: 'nbonexicixldqxzc'
//       }
//   }

//   const mensaje = {
//       from : 'fundacionhenry@gmail.com',
//       to : email,
//       subject : 'Correo de prueba de bienvenida',
//       text : 'Envio de correo'
//   }

//   const transport = nodemailer.createTransport(config)

//   const info = await transport.sendMail(mensaje)

//   console.log(info)
// }

user.login = async (req, res) => {
  const { email, password } = req.body;
  const verifyUser = await getUser({ email });
  if (verifyUser) {
    if (verifyUser.active === false) {
      return res.status(400).json({
        msg: 'El usuario se encuentra inactivo, contactarse con fundacionhenry@gmail.com.'
      });
    };
    const verifyPassword = await verifyUser.verifyPassword(password);

    if (!verifyPassword) {
      return res.status(400).json({
        msg: 'Email o contraseña incorrectos.'
      });
    }
    try {
      const token = jwt.sign(verifyUser._id.toString(), process.env.PRIVATE_TOKEN);

      return res.status(200).json({
        auth: true,
        token,
        msg: 'Inicio de sesion correctamente.'
      });
    } catch (error) {
      return res.status(400).json({
        msg: 'Hubo un problema, intentalo nuevamente.'
      });
    }
  } else {
    return res.status(400).json({
      msg: 'Email o contraseña incorrectos.'
    });
  }
};

// Mantengo la ruta para que puedan asignar roles durante el desarrollo pero la idea es que luego se cree por defecto en client.
user.register = async (req, res) => {
  const { name, lastName, email, birthdate, password, dni, address, avatar, phone, roles } = req.body;

  if (name && email && password) {
    console.log({ name, email, password });
    try {
      const verifyUser = await getUser({ email }).populate('roles'); // El populate es para que me relacione a los roles con id

      if (verifyUser && verifyUser.active === false) {
        return res.status(400).json({
          msg: 'El usuario se encuentra desactivado, por favor contactarse con fundacionhenry@gmail.com'
        });
      }
      if (verifyUser !== undefined) {
        const sendMail = async (email) => {
          const config = {
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
              user: 'fundacionhenry@gmail.com',
              pass: 'nbonexicixldqxzc'
            }
          };

          const mensaje = {
            from: 'fundacionhenry@gmail.com',
            to: email,
            subject: 'Correo de bienvenida',
            text: `El usuario con nombre: ${name} y email: ${email} se registro correctamente
            Cualquier duda comuniquese al email: fundacionhenry@gmail.com`
          };

          const transport = nodemailer.createTransport(config);

          const info = await transport.sendMail(mensaje);

          console.log(info);
        };

        if (verifyUser) {
          return res.status(400).json({
            msg: `El correo ${verifyUser.email} ya esta registrado`
          });
        }
        const active = true;

        const newUser = new User({
          name,
          lastName,
          email,
          birthdate,
          password,
          dni,
          address,
          avatar,
          phone,
          roles,
          active
        });

        newUser.password = await newUser.encryptPassword(newUser.password); // Encripto la password

        if (roles) {
          const foundRoles = await Role.find({ name: { $in: roles } });
          newUser.roles = foundRoles.map(role => role._id);
        } else {
          const role = await Role.findOne({ name: 'client' });
          newUser.roles = [role.id];
        }
        const saveUser = await newUser.save();
        const token = jwt.sign({ id: saveUser._id }, process.env.PRIVATE_TOKEN);

        if (token) {
          sendMail(email);
          return res.status(200).json({
            msg: 'Usuario creado correctamente.',
            auth: true,
            token
          });
        } else {
          return res.status(400).json({
            msg: 'Hubo un problema, intentalo nuevamente.'
          });
        }
      }
    } catch (error) {
      return res.status(400).json({
        msg: 'Hubo un problema, intentalo nuevamente.'
      });
    }
  }
};

// CLIENT --
user.updateUser = async (req, res) => {
  const user = await User.findById(req.userId);
  if (user) {
    try {
      await User.findByIdAndUpdate(req.userId, req.body);
      const findUser = await User.findById(req.userId);
      return res.status(200).json({
        msg: 'Actualizado correctamente.',
        findUser
      });
    } catch {
      return res.status(400).json({
        msg: 'Ocurrio un problema, intentalo nuevamente.'
      });
    }
  } else {
    return res.status(404).json({
      msg: 'The user not found.'
    });
  }
};

user.deactivateUser = async (req, res) => {
  const user = await User.findById(req.userId);

  if (user) {
    try {
      await User.findByIdAndUpdate(req.userId, { active: false });
      return res.status(200).json({
        msg: 'User desactivado correctamente.'
      });
    } catch {
      return res.status(400).json({
        msg: 'Ocurrio un problema, intentalo nuevamente.'
      });
    }
  } else {
    return res.status(404).json({
      msg: 'The user not found.'
    });
  }
};

user.profile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('roles');
    if (!user) {
      return res.status(404).json({
        msg: 'The user not found.'
      });
    } else {
      return res.status(200).json({
        user
      });
    }
  } catch (error) {
    return res.state(400).json({
      msg: 'Ocurrio un problema, intentalo nuevamente.'
    });
  }
};

// ADMIN --
user.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        msg: 'The user not found.'
      });
    } else {
      return res.status(200).json({
        user
      });
    }
  } catch {
    return res.state(400).json({
      msg: 'Ocurrio un problema, intentalo nuevamente.'
    });
  }
};

user.getAllUser = async (req, res) => {
  const { active, roles, sort, search, page = 1, limit = 8 } = req.query;
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    populate: 'roles'
  };

  const filters = {};

  if (search) {
    filters.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }
  if (active) {
    filters.active = (active === 'true');
  };

  if (roles) {
    filters.roles = [roles];
  };

  const sortOptions = {};

  if (sort === 'alphabetical') {
    sortOptions.name = 1;
  };

  if (sort === 'alphabetical_desc') {
    sortOptions.name = -1;
  };

  console.log(filters);
  try {
    const paginateUser = await User.paginate({ ...filters }, {
      ...options,
      sort: sortOptions
    });

    if (!paginateUser.totalDocs) {
      return res.status(404).json({
        msg: 'No se encontraron usuarios.'
      });
    };
    return res.status(200).json({
      totalPages: paginateUser.totalPages,
      currentPage: paginateUser.page,
      totalItems: paginateUser.totalDocs,
      search,
      filters,
      forms: paginateUser.docs
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'Ocurrio un problema, intentalo nuevamente.'
    });
  }
};

// Este es el maldito codigo que funciona
// user.getAllUser = async (req, res) => {
//   try {
//     const { name, email, roles, sortBy, search } = req.query;

//     const filter = {};

//     if (search) {
//       filter.$or = [
//         { name: { $regex: search, $options: 'i' } },
//         { email: { $regex: search, $options: 'i' } },
//       ];
//     }

//     if (name) {
//       filter.name = { $regex: name, $options: 'i' };
//     }

//     if (email) {
//       filter.email = { $regex: email, $options: 'i' };
//     }

//     if (roles) {
//       filter.roles = { $in: roles };
//     }

//     const sortOptions = {};

//     if (sortBy === 'asc') {
//       sortOptions.name = 1;
//     } else if (sortBy === 'desc') {
//       sortOptions.name = -1;
//     }

//     const options = {
//       sort: sortOptions,
//     };

//     const { docs, totalDocs, totalPages } = await User.paginate(filter, options);

//     return res.status(200).json({
//       users: docs,
//       totalUsers: totalDocs,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       msg: 'Ocurrio un problema, intentalo nuevamente.',
//       error: error.message,
//     });
//   }
// };

// Register para crear usuarios 'moderator' y 'admin'
user.createUser = async (req, res) => {
  const { name, lastName, email, birthdate, password, dni, address, avatar, phone, roles } = req.body;

  if (name && email && password && roles) {
    try {
      const verifyUser = await getUser({ email }).populate('roles'); // El populate es para que me relacione a los roles con id

      if (verifyUser !== undefined) {
        const sendMail = async (email) => {
          const config = {
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
              user: 'fundacionhenry@gmail.com',
              pass: 'nbonexicixldqxzc'
            }
          };

          const mensaje = {
            from: 'fundacionhenry@gmail.com',
            to: email,
            subject: 'Correo de bienvenida',
            text: `El usuario con nombre: ${name} y email: ${email} se registro correctamente
            Cualquier duda comuniquese al email: fundacionhenry@gmail.com`
          };

          const transport = nodemailer.createTransport(config);

          await transport.sendMail(mensaje);
        };

        if (verifyUser) {
          return res.status(400).json({
            msg: `El correo ${verifyUser.email} ya esta registrado`
          });
        }
        const active = true;

        const newUser = new User({
          name,
          lastName,
          email,
          birthdate,
          password,
          dni,
          address,
          avatar,
          phone,
          roles,
          active
        });

        newUser.password = await newUser.encryptPassword(newUser.password); // Encripto la password

        const foundRoles = await Role.find({ name: { $in: roles } });
        newUser.roles = foundRoles.map(role => role._id);

        const saveUser = await newUser.save();
        const token = jwt.sign({ id: saveUser._id }, process.env.PRIVATE_TOKEN);

        if (token) {
          sendMail(email);
          return res.status(200).json({
            msg: 'Usuario creado correctamente.',
            auth: true,
            token
          });
        } else {
          return res.status(400).json({
            msg: 'Hubo un problema, intentalo nuevamente.'
          });
        }
      }
    } catch (error) {
      return res.status(400).json({
        msg: 'Hubo un problema, intentalo nuevamente.'
      });
    }
  }
};

user.updateActive = async (req, res) => {
  const active = req.body;
  console.log(active);
  const user = await User.findById(req.params.id);
  if (user) {
    try {
      const updateUser = await User.findByIdAndUpdate(req.params.id, active);
      console.log(updateUser);
      return res.status(200).json({
        msg: 'Actualizado correctamente.'
      });
    } catch {
      return res.status(400).json({
        msg: 'Ocurrio un problema, intentalo nuevamente.'
      });
    }
  } else {
    return res.status(404).json({
      msg: 'The user not found.'
    });
  }
};

user.deleteUserByAdmin = async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log(user);
  if (user) {
    try {
      const deletePet = await User.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        msg: 'User eliminado correctamente.',
        deletePet
      });
    } catch {
      return res.status(400).json({
        msg: 'Ocurrio un problema, intentalo nuevamente.'
      });
    }
  } else {
    return res.status(404).json({
      msg: 'The user not found.'
    });
  }
};
module.exports = user;
