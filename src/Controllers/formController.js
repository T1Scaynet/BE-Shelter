const PetRequest = require('../Models/petRequest');

const postForm = async (req, res) => {
  const { idPet, idUser, otherPets, garden, children, adoption, familyMembers } = req.body;
  // console.log(req.body);
  // console.log(Object.values(req.body));
  if (Object.values(req.body).length === 0) throw Error('Missing data');
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
    // res.status(200).send('request successfully sent');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteForm = async (req, res) => {
  try {
    const deleted = await PetRequest.findByIdAndDelete(req.params.id);
    // res.status(200).json(deleted);
    res.status(200).send(`form with id: ${deleted.id}, successfully removed`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllForms = async (req, res) => {
  try {
    const allForms = await PetRequest.find({});
    if (!allForms.length) throw Error('There are no forms');
    res.status(200).json(allForms);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAForm = async (req, res) => {
  try {
    const form = await PetRequest.findById(req.params.id);
    if (!form) throw Error(`the form with id ${req.params.id} is missing`);
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
