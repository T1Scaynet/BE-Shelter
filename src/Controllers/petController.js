const { response } = require('express');
const mercadopago = require('mercadopago');
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
  const { type, genre, size, sort, page = 1, limit = 8, search } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit)
  };

  const filters = {};

  if (search) {
    filters.$or = [
      { name: { $regex: search, $options: "i" } },
      { type: { $regex: search, $options: "i" } }, // esto es opcional por si queres buscar por type
      { genre: { $regex: search, $options: "i" } },// esto es opcional por si queres buscar por genero
      { size: { $regex: search, $options: "i" } }  // esto es opcional por si queres buscar por size 
    ];
  }
  

  if (type) {
    filters.type = type;
  }

  if (genre) {
    filters.genre = genre;
  }

  if (size) {
    filters.size = size;
  }
  console.log(filters);
  const sortOptions = {};

  if (sort === 'alphabetical') {
    sortOptions.name = 1;
  }

  if (sort === 'alphabetical_desc') {
    sortOptions.name = -1;
  }

  try {

    const result = await Pet.paginate({ ...filters }, {
      ...options,
      sort: sortOptions
    });

    if (!result.totalDocs) {
      return res.status(404).json({
        msg: 'No se encontraron mascotas.'
      });
    }

    return res.status(200).json({
      totalPages: result.totalPages,
      currentPage: result.page,
      totalItems: result.totalDocs,
      search: search,
      filters: filters,
      pets: result.docs
    });
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
    const { name, type, genre, age, state, size, image, galery, weight, vaccine, castrated, disease, disability, coexistencePets, coexistenceKids } = req.body;
    if (name && type && genre && age && state && size && image && galery && weight && vaccine && castrated && coexistencePets && coexistenceKids) {
      try {
        const verifyName = await getPet({
          name
        });
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
  }
};

// pet.createPayment = async (req, res) => {
//   const products = req.body;

//   let preference = {
//     items: [{
//       id: 123,
//       title: products.title,
//       currency_id: 'ARS',
//       picture_url: products.image,
//       description: products.description,
//       category_id: 'art',
//       quantity: 1,
//       unit_price: products.price
//     }],
//     back_urls: {
//       success: 'http://localhost:3000',
//       failure:'',
//       pending:'',
//     },
//     auto_return: 'approved',
//     binary_mode: true,
//   }
//   mercadopago.preferences.create(preference)
//     .then((response)=> res.status(200).send(response))
//     .catch((error)=> res.status(400).send({error: error.message}))
// };

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

pet.getFourPet = async (req, res) => {
  try {
    const cuatroUltimos = await Pet.find().limit(4);
    return res.status(200).json(cuatroUltimos);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = pet;
