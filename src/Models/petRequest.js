const { Schema, model } = require('mongoose');

const petRequest = new Schema({
  dateNow: {
    type: Date,
    default: new Date()
  },
  idUser: {
    type: String,
    required: true
  },
  idPet: {
    type: String,
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
  }
});

module.exports = model('petRequest', petRequest);
