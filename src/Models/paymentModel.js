const { Schema, model } = require('mongoose');

const paymentSchema = new Schema({
  idUser: {
    ref: 'User',
    type: Schema.Types.ObjectId
  },
  amount: {
    type: Number,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  status: {
    type: String,
    require: true
  },
  url: {
    type: String,
    require: true
  },
  createAt: {
    type: Date,
    default: new Date()
  }
});

module.exports = model('Payment', paymentSchema);
