const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
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
    type: String
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

// Metodos para las contraseñas

userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); // Encripto 10 veces la contraseña
  return bcrypt.hash(password, salt);
};

module.exports = model('User', userSchema);
