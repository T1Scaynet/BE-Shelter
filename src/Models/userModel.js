const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const mongoosePaginate = require('mongoose-paginate-v2');

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
    type: String,
    required: false
  },
  avatar: {
    type: String,
    default: 'https://st4.depositphotos.com/27392032/41587/i/450/depositphotos_415872184-stock-photo-i-love-dog-cat-concept.jpg'
  },
  phone: {
    type: Number,
    required: false
  },
  roles: [{
    ref: 'Role',
    type: Schema.Types.ObjectId
  }],
  adoptions: [{
    ref: 'Pet',
    type: Schema.Types.ObjectId
  }],
  active: {
    type: Boolean
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
userSchema.plugin(mongoosePaginate);
module.exports = model('User', userSchema);
