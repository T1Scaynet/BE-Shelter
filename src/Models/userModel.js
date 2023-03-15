const { Schema, Types, model } = require('mongoose');

const userSchema = new Schema({
  id: {
    type: Types.UUID,
    default: Types.UUIDv4,
    required: true,
    unique: true
  },
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
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dni: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  createAt: {
    type: Date,
    default: new Date()
  }
});

module.exports = model('User', userSchema);