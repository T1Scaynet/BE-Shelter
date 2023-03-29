const mercadopago = require('mercadopago');
const Payment = require('../Models/paymentModel');

const payment = {};

// // http://localhost:3001/payment esta es la ruta

payment.createPayment = async (req, res) => {
  try {
    const { products } = req.body;
    const user = req.userId;
    console.log(products)
    const items = products.map((product, index) => ({
      id: index + 1,
      title: product.title,
      currency_id: 'ARS',
      picture_url: product.image,
      description: product.description,
      category_id: 'art',
      quantity: product.cartQuantity,
      unit_price: product.price

    }));

    const preference = {
      items,
      back_urls: {
        success: process.env.PAYMENT_SUCCESS,
        failure: process.env.PAYMENT_FAILURE,
        pending: ''
      },
      auto_return: 'approved',
      binary_mode: true
    };
    const response = await mercadopago.preferences.create(preference);
    const newPayment = new Payment({
      id: user,
      amount: products.reduce((total, product) => total + product.price, 0),
      title: products.map(product => product.title).join(', ')
    });
    await newPayment.save();

    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

payment.getAllPayments = async (req, res) => {
  try {
    const allPayments = await Payment.find();

    return res.status(200).json({
      allPayments
    });
  } catch (error) {
    return res.state(400).json({
      msg: 'Ocurrio un problema, intentalo nuevamente.'
    });
  }
};

payment.getPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (payment) {
      return res.status(404).json({
        msg: 'The payment not found.'
      });
    } else {
      return res.status(200).json({
        payment
      });
    }
  } catch {
    return res.state(400).json({
      msg: 'Ocurrio un problema, intentalo nuevamente.'
    });
  }
};

payment.deletePayment = async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  console.log(payment);
  if (payment) {
    try {
      const deletepayment = await Payment.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        msg: 'payment eliminado correctamente.',
        deletepayment
      });
    } catch {
      return res.status(400).json({
        msg: 'Ocurrio un problema, intentalo nuevamente.'
      });
    }
  } else {
    return res.status(404).json({
      msg: 'The payment not found.'
    });
  }
};

payment.updatePayment = async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  if (payment) {
    try {
      let updatepayment = await Payment.findByIdAndUpdate(req.params.id, req.body);
      updatepayment = req.body;
      return res.status(200).json({
        msg: 'Actualizado correctamente.',
        updatepayment
      });
    } catch {
      return res.status(400).json({
        msg: 'Ocurrio un problema, intentalo nuevamente.'
      });
    }
  } else {
    return res.status(404).json({
      msg: 'The payment not found.'
    });
  }
};
module.exports = payment;
