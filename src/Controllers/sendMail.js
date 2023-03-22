const nodemailer = require('nodemailer')

const sendMail = async() => {
    const config = {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'fundacionhenry@gmail.com',
            pass: 'nbonexicixldqxzc'
        }
    }

    const mensaje = {
        from : 'fundacionhenry@gmail.com',
        to : 'rojassrodrigo885@gmail.com',
        subject : '',
        text : 'Correo de prueba de bienvenida'
    }

    const transport = nodemailer.createTransport(config)

    const info = await transport.sendMail(mensaje)

    console.log(info)
}

sendMail();