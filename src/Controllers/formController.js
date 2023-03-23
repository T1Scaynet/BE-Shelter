const PetRequest = require('../Models/petRequest');

const postForm = async (req, res) => {
  const { idPet, idUser, otherPets, garden, children, adoption, familyMembers } = req.body;
  if (Object.values(req.body).length === 0) throw Error('Faltan datos');
  try {
    const newForm = new PetRequest({
      idPet,
      idUser,
      otherPets,
      garden,
      children,
      adoption,
      familyMembers
    });
    newForm.save();
    res.status(200).json(newForm);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteForm = async (req, res) => {
  try {
    const deleted = await PetRequest.findByIdAndDelete(req.params.id);
    res.status(200).send(`el formulario con el id: ${deleted.id}, fue eliminado correctamente`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllForms = async (req, res) => {
  try {
    const allForms = await PetRequest.find({});
    if (!allForms.length) throw Error('No hay formularios disponibles');
    res.status(200).json(allForms);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAForm = async (req, res) => {
  try {
    const form = await PetRequest.findById(req.params.id);
    if (!form) throw Error(`El formulario con el id: ${req.params.id} no existe`);
    res.status(200).json(form);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  postForm,
  deleteForm,
  getAllForms,
  getAForm
};
