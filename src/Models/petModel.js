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
  // En adopcion, en transito, adoptado
  state: {
    type: String,
    enum: ['Disponible', 'Adoptado'],
    required: true
  },
  size: {
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
  adoptedBy: {
    ref: 'User',
    type: Schema.Types.ObjectId
  },
  deleted: {
    type: Boolean,
    default: false
  },
  createAt: {
    type: Date,
    default: new Date()
  }
});

petSchema.plugin(mongoosePaginate);
module.exports = model('Pet', petSchema);
