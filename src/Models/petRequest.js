const { Schema, model } = require('mongoose');

const petRequest = new Schema({
  idPet: {
    ref: 'Pet',
    type: Schema.Types.ObjectId
  },
  idUser: {
    ref: 'User',
    type: Schema.Types.ObjectId
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
  // Puede tener 3 estados: Aprobado, Desaprobado y en proceso
  state: {
    type: String
  },
  createAt: {
    type: Date,
    default: new Date()
  }
});

module.exports = model('PetRequest', petRequest);
