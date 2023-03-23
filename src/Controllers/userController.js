const User = require('../Models/userModel');
const Role = require('../Models/roleModel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
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
        user: {
          name: verifyUser.name,
          password: verifyUser.email
        },
        msg: 'Logeado correctamente.'
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

user.register = async (req, res) => {
  const { name, lastName, email, birthdate, password, dni, address, avatar, phone, roles } = req.body;

  if (name && email && password) {
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
            subject: 'Correo de prueba de bienvenida',
            text: 'Envio de correo'
          };

          const transport = nodemailer.createTransport(config);

          const info = await transport.sendMail(mensaje);

          console.log(info);
        };

        if (verifyUser) {
          return res.status(400).json({
            msg: 'El Email ya existe.'
          });
        }

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
          roles
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
          return res.status(200).json({
            msg: 'Usuario creado correctamente.',
            auth: true,
            token
          });
        }

        if (saveUser) {
          sendMail(email);
          return res.status(200).json({
            user: {
              name: newUser.name,
              email: newUser.email
            },
            msg: 'Usuario creado correctamente.'
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

user.updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    try {
      const updateUser = await User.findByIdAndUpdate(req.params.id, req.body);
      console.log(updateUser);
      return res.status(200).json({
        msg: 'Actualizado correctamente.',
        updateUser
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

user.deleteUser = async (req, res) => {
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
  try {
    const allUsers = await User.find();

    return res.status(200).json({
      allUsers
    });
  } catch (error) {
    return res.state(400).json({
      msg: 'Ocurrio un problema, intentalo nuevamente.'
    });
  }
};

user.profile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
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
module.exports = user;
