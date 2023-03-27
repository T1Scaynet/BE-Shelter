const { Schema, model } = require('mongoose');

const contactForm = new Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
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
  message: {
    type: String,
    required: true
  }
});

module.exports = model('ContactForm', contactForm);
