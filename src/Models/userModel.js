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
  birthdate: {
    type: Date
  },
  password: {
    type: String
  },
  dni: {
    type: Number
  },
  address: {
    type: String
  },
  avatar: {
    type: String
  },
  phone: {
    type: Number
  },
  roles: [{
    ref: 'Role',
    type: Schema.Types.ObjectId
  }],
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
