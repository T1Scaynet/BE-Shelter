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
    required: true
  },
  phone: {
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
    enum: ['Es para un tercero', 'Es para mi'],
    required: true
  },
  familyMembers: {
    type: Number,
    required: true
  },
  // Puede tener 3 estados: Aprobado, Desaprobado y en proceso
  state: {
    type: String,
    enum: ['Aprobado', 'Desaprobado', 'En proceso']
  },
  createAt: {
    type: Date,
    default: new Date()
  }
});

module.exports = model('PetRequest', petRequest);
