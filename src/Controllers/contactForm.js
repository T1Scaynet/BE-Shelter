const ContactForm = require('../Models/contactForm');

const postContactForm = async (req, res) => {
  const { name, lastName, email, phone } = req.body;
  if (Object.values(req.body).length === 0) throw Error('Faltan datos');
  
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
  try {
    const newForm = new ContactForm({
      name,
      lastName,
      email,
      phone
    });
    sendMail(email)
    await newForm.save();
    res.status(200).json(newForm);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllContactForms = async (req, res) => {
  try {
    const allForms = await ContactForm.find({});
    if (!allForms.length) throw Error('No hay formularios disponibles');
    res.status(200).json(allForms);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAContactForm = async (req, res) => {
  try {
    const form = await ContactForm.findById(req.params.id);
    if (!form) throw Error(`El formulario con el id: ${req.params.id} no existe`);
    res.status(200).json(form);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteContactForm = async (req, res) => {
  try {
    const deleted = await ContactForm.findByIdAndDelete(req.params.id);
    res.status(200).send(`el formulario con el id: ${deleted.id}, fue eliminado correctamente`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  postContactForm,
  getAllContactForms,
  getAContactForm,
  deleteContactForm
};
