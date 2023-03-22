const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: false
  },
  password: {
    type: String,
    required: false
  },
  dni: {
    type: Number,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  avatar: {
    type: String
  },
  phone: {
    type: Number,
    required: false
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
