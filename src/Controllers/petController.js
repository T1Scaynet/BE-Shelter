const Pet = require('../Models/petModel');

const pet = {};

const getPet = (data) => {
  try {
    return Pet.findOne(data);
  } catch (error) {
    return false;
  }
};

pet.getAllPets = async (req, res) => {
  try {
    const allPets = await Pet.find();

    let filteredPets = allPets;

    if (req.query.type) {
      filteredPets = filteredPets.filter((pet) => pet.type === req.query.type);
    }

    if (req.query.genre) {
      filteredPets = filteredPets.filter(
        (pet) => pet.genre === req.query.genre
      );
    }

    if (req.query.size) {
      filteredPets = filteredPets.filter((pet) => pet.size === req.query.size);
    }

    if (req.query.sort === 'alphabetical') {
      filteredPets.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (req.query.sort === 'alphabetical_desc') {
      filteredPets.sort((a, b) => b.name.localeCompare(a.name));
    }

    if (!filteredPets.length) {
      return res.status(404).json({
        msg: 'No se encontraron mascotas.'
      });
    } else {
      return res.status(200).json({
        filteredPets
      });
    }
  } catch (error) {
    return res.status(404).json({
      msg: 'Ocurrio un problema, intenta nuevamente.'
    });
  }
};

pet.getPet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({
        msg: 'No se encontro la mascota.'
      });
    } else {
      return res.status(200).json({
        pet
      });
    }
  } catch {
    return res.status(400).json({
      msg: 'Ocurrio un problema. intentalo nuevamente.'
    });
  }
};

pet.createPet = async (req, res) => {
  const { name, type, genre, age, state, size, image, galery, history, weight, vaccine, castrated, disease, disability, coexistencePets, coexistenceKids } = req.body;
  if (name && type && genre && age && state && size && image && galery && history && weight && vaccine && castrated && coexistencePets && coexistenceKids) {
  const {
    name,
    type,
    genre,
    age,
    state,
    size,
    image,
    galery,
    weight,
    vaccine,
    castrated,
    disease,
    disability,
    coexistencePets,
    coexistenceKids
  } = req.body;
  if (
    name &&
    type &&
    genre &&
    age &&
    state &&
    size &&
    image &&
    galery &&
    weight &&
    vaccine &&
    castrated &&
    coexistencePets &&
    coexistenceKids
  ) {
  
    try {
      const verifyName = await getPet({ name });
      if (verifyName) {
        return res.status(400).json({
          msg: 'El nombre de la mascota ya existe'
        });
      }
      const newPet = new Pet({
        name,
        type,
        genre,
        age,
        state,
        size,
        image,
        galery,
        history,
        weight,
        vaccine,
        castrated,
        disease,
        disability,
        coexistencePets,
        coexistenceKids
      });
      const savePet = newPet.save();
      if (savePet) {
        return res.status(200).json({
          msg: 'La mascota fue creada exitosamente!'
        });
      } else {
        return res.status(400).json({
          msg: 'Ocurrio un problema, intentalo nuevamente.'
        });
      }
    } catch (error) {
      return res.status(400).json({
        msg: 'Ocurrio un problema, intentalo nuevamente.'
      });
    }
  } else {
    return res.status(400).json({
      msg: 'Campos incompletos.'
    });
  }
};

pet.updatePet = async (req, res) => {
  const pet = await Pet.findById(req.params.id);
  if (pet) {
    try {
      let updatePet = await Pet.findByIdAndUpdate(req.params.id, req.body);
      updatePet = req.body;
      return res.status(200).json({
        msg: 'Actualizado correctamente.',
        updatePet
      });
    } catch {
      return res.status(400).json({
        msg: 'Ocurrio un problema, intentalo nuevamente.'
      });
    }
  } else {
    return res.status(404).json({
      msg: 'The pet not found.'
    });
  }
};

pet.deletePet = async (req, res) => {
  const pet = await Pet.findById(req.params.id);
  console.log(pet);
  if (pet) {
    try {
      const deletePet = await Pet.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        msg: 'Mascota eliminada correctamente.',
        deletePet
      });
    } catch {
      return res.status(400).json({
        msg: 'Ocurrio un problema, intentalo nuevamente.'
      });
    }
  } else {
    return res.status(404).json({
      msg: 'The pet not found.'
    });
  }
};

module.exports = pet;
