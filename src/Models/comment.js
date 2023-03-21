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
  comments: {
    type: String,
    max: 150,
    required: true
  },
  createAt: {
    type: Date,
    default: new Date()
  }
});

module.exports = model('Comment', comment);
