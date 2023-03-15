const { Schema, model } = require('mongoose');

const comment = new Schema({
  idPet: {
    type: String,
    required: true
  },
  idUser: {
    type: String,
    required: true
  },
  stars: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    max: 150,
    required: true
  }
});

module.exports = model('comment', comment);
