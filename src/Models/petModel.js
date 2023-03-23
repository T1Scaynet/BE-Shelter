const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const petSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  galery: {
    type: Array,
    required: true
  },
  history: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  vaccine: {
    type: String,
    required: true
  },
  castrated: {
    type: Boolean,
    required: true
  },
  disease: {
    type: String
  },
  disability: {
    type: String
  },
  coexistencePets: {
    type: Boolean,
    required: true
  },
  coexistenceKids: {
    type: Boolean,
    required: true
  },
  createAt: {
    type: Date,
    default: new Date()
  }
});

petSchema.plugin(mongoosePaginate);
module.exports = model('Pet', petSchema);
