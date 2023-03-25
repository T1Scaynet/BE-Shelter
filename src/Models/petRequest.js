const { Schema, model } = require('mongoose');

const petRequest = new Schema({
  idUser: {
    type: String,
    required: false
  },
  idPet: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: Number,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  otherPets: {
    type: Boolean,
    required: true
  },
  garden: {
    type: Boolean,
    required: true
  },
  children: {
    type: Boolean,
    required: true
  },
  // adopcion para mi o para un tercero (array de string)
  adoption: {
    type: String,
    required: true
  },
  familyMembers: {
    type: Number,
    required: true
  },
  createAt: {
    type: Date,
    default: new Date()
  }
});

module.exports = model('PetRequest', petRequest);
