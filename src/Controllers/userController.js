const User = require('../Models/userModel');
const nodemailer = require('nodemailer');

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
  const verifyEmail = await getUser({ email });
  console.log(verifyEmail);
  if (verifyEmail) {
    const verifyPassword = await verifyEmail.verifyPassword(password);
    if (!verifyPassword) {
      return res.status(400).json({
        msg: 'Email o contraseña incorrectos.'
      });
    }
    try {
      return res.status(200).json({
        user: {
          name: verifyEmail.name,
          password: verifyEmail.email
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
  const { name, lastName, email, age, password, dni, address, avatar, phone } = req.body;

  if (name && email && password) {
    try {
      const verifyEmail = await getUser({ email });

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
      if (verifyEmail) {
        return res.status(400).json({
          msg: 'El Email ya existe.'
        });
      }
      const newUser = new User({
        name,
        lastName,
        email,
        age,
        password,
        dni,
        address,
        avatar,
        phone
      });

      newUser.password = await newUser.encryptPassword(newUser.password); // Encripto la contrasesña

      const saveUser = newUser.save();

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
    } catch (error) {
      return res.status(400).json({
        msg: 'Hubo un problema, intentalo nuevamente.'
      });
    }
  } else {
    return res.status(400).json({
      msg: 'Campos incompletos.'
    });
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

module.exports = user;
