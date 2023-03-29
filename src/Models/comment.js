const { Schema, model } = require('mongoose');

const comment = new Schema({
  idUser: {
    ref: 'User',
    type: Schema.Types.ObjectId
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
