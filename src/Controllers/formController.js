const nodemailer = require('nodemailer');

const PetRequest = require('../Models/petRequest');
const User = require('../Models/userModel');
const Pet = require('../Models/petModel');

const petRequest = {};

petRequest.postForm = async (req, res) => {
  const { idPet, otherPets, garden, children, adoption, familyMembers, name, lastName, address, email, phone, age } = req.body;
  const idUser = req.userId;
  if (!idPet && !idUser && !otherPets && !garden && !children && !adoption && !familyMembers) {
    return res.status(400).json({
      msg: 'Campos incompletos.'
    });
  }
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
      subject: 'Correo de comprobacion de solicitud de adopcion recibido',
      text: `Se envio el formulario de contacto con los siguientes datos:
      nombre: ${name} 
      apellido: ${lastName} 
      email: ${email}
      telefono: ${phone} 
      direccion: ${address}
      Nos estaremos comunicando, fundacionhenry@gmail.com`
    };

    const transport = nodemailer.createTransport(config);

    const info = await transport.sendMail(mensaje);

    console.log(info);
  };
  try {
    const state = 'En proceso';
    const newForm = new PetRequest({
      idPet,
      idUser,
      name,
      lastName,
      address,
      email,
      phone,
      age,
      otherPets,
      garden,
      children,
      adoption,
      familyMembers,
      state
    });
    sendMail(email);
    newForm.save();
    res.status(200).json(newForm);
  } catch (error) {
    res.status(400).json({
      msg: 'Ocurrio un problema, intentalo nuevamente.'
    });
  }
};

petRequest.deleteForm = async (req, res) => {
  try {
    const deleted = await PetRequest.findByIdAndDelete(req.params.id);
    res.status(200).send(`el formulario con el id: ${deleted.id}, fue eliminado correctamente`);
  } catch (error) {
    res.status(400).json({
      msg: 'Ocurrio un problema, intentalo nuevamente.'
    });
  }
};

petRequest.getAllForms = async (req, res) => {
  try {
    const options = {
      page: 1,
      limit: 8
    };
    const paginateForm = await PetRequest.paginate({}, options);
    return res.status(200).json({
      totalPages: paginateForm.totalPages,
      currentPage: paginateForm.page,
      totalItems: paginateForm.totalDocs,
      forms: paginateForm.docs
    });
  } catch (error) {
    res.status(400).json({
      msg: 'Ocurrio un problema, intentalo nuevamente.'
    });
  }
};

petRequest.getForm = async (req, res) => {
  try {
    const form = await PetRequest.findById(req.params.id);
    if (!form) throw Error(`El formulario con el id: ${req.params.id} no existe`);
    res.status(200).json(form);
  } catch (error) {
    res.status(400).json({
      msg: 'Ocurrio un problema, intentalo nuevamente.'
    });
  }
};

petRequest.stateForm = async (req, res) => {
  const state = req.body;
  if (state) {
    try {
      await PetRequest.findByIdAndUpdate(req.params.id, state);
      const request = await PetRequest.findById(req.params.id);

      if (state.state === 'Aprobado') {
        await User.findByIdAndUpdate(request.idUser, { adoptions: request.idPet });
        await Pet.findByIdAndUpdate(request.idPet, { adoptedBy: request.idUser, state: 'Adoptado' });
      };
      return res.status(200).json({
        msg: 'Estado actualizado correctamente.'
      });
    } catch (error) {
      return res.status(400).json({
        msg: 'Ocurrio un problema, intentalo nuevamente.'
      });
    }
  } else {
    return res.status(400).json({
      msg: 'Campos incompletos, se necesita un state.'
    });
  }
};

module.exports = petRequest;
