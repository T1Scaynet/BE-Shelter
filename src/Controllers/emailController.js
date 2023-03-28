const User = require('../Models/userModel');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const emailController = {};

// Función para encontrar un usuario en la base de datos
const findUser = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Función para enviar un correo electrónico de recuperación de contraseña
const sendPasswordResetEmail = async (email, resetToken) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'fundacionhenry@gmail.com',
      pass: 'nbonexicixldqxzc'
    }
  });

  const message = {
    from: 'fundacionhenry@gmail.com',
    to: email,
    subject: 'Recuperación de contraseña',
    text: `Haz clic en este enlace para restablecer tu contraseña: http://localhost:3000/reset/${resetToken}`
  };

  const info = await transporter.sendMail(message);
  console.log('Correo electrónico enviado:', info.messageId);
};

// Función para generar un token de recuperación de contraseña
const generateResetToken = async () => {
  try {
    const resetToken = await crypto.randomBytes(20).toString('hex');
    return resetToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};

emailController.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await findUser(email);

    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const resetToken = await generateResetToken();

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    await sendPasswordResetEmail(email, resetToken);

    return res.status(200).json({ message: 'Se ha enviado un correo electrónico para restablecer la contraseña' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al enviar el correo electrónico de recuperación de contraseña' });
  }
};

emailController.resetPassword = async (req, res) => {
  const { newPassword, email } = req.body;

  try {
    // Encontrar el usuario en la base de datos
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Token de recuperación de contraseña inválido o expirado' });
    }

    // Actualizar la contraseña del usuario
    user.password = newPassword;
    user.password = await user.encryptPassword(user.password); // Encripto la password
    await user.save();

    return res.status(200).json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al actualizar la contraseña' });
  }
};

module.exports = emailController;

// const User = require('../Models/userModel');
// const nodemailer = require('nodemailer');

// const emailController = {};

// // Función para enviar correo electrónico de recuperación de contraseña
// const sendPasswordResetEmail = (email, token) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'tu_correo@gmail.com',
//       pass: 'tu_contraseña',
//     },
//   });

//   const mailOptions = {
//     from: 'tu_correo@gmail.com',
//     to: email,
//     subject: 'Recuperación de contraseña',
//     html: `
//       <p>Estimado usuario:</p>
//       <p>Hemos recibido una solicitud para recuperar la contraseña de tu cuenta.</p>
//       <p>Por favor, haz clic en el siguiente enlace para continuar con el proceso:</p>
//       <a href="http://localhost:3000/reset-password/${token}">Recuperar contraseña</a>
//       <p>Si tú no hiciste esta solicitud, por favor ignora este correo electrónico.</p>
//       <p>Atentamente,</p>
//       <p>Tu equipo de soporte técnico</p>
//     `,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });
// };

// // Función para solicitar recuperación de contraseña
// emailController.forgotPassword = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ msg: 'No se encontró el usuario con ese correo electrónico' });
//     }

//     // Generar un token de recuperación de contraseña
//     const token = user.generatePasswordResetToken();

//     // Guardar el token de recuperación de contraseña en la base de datos
//     await user.save();

//     // Enviar correo electrónico de recuperación de contraseña
//     sendPasswordResetEmail(email, token);

//     res.status(200).json({ msg: 'Correo electrónico enviado con éxito' });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: 'Ocurrió un error al solicitar la recuperación de contraseña' });
//   }
// };

// module.exports = User

// ESTA ES LA FUNCION QUE FUNCIONA PARA MANDAR MAILS
// const nodemailer = require('nodemailer')

// const sendMail = async() => {
//     const config = {
//         host: 'smtp.gmail.com',
//         port: 587,
//         auth: {
//             user: 'fundacionhenry@gmail.com',
//             pass: 'nbonexicixldqxzc'
//         }
//     }

//     const mensaje = {
//         from : 'fundacionhenry@gmail.com',
//         to : 'rojassrodrigo885@gmail.com',
//         subject : '',
//         text : 'Correo de prueba de bienvenida'
//     }

//     const transport = nodemailer.createTransport(config)

//     const info = await transport.sendMail(mensaje)

//     console.log(info)
// }

// sendMail();
