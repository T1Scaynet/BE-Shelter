const mercadopago = require('mercadopago');
const Payment = require('../Models/paymentModel');

const pet = {};

// // http://localhost:3001/payment esta es la ruta

pet.createPayment = async (req, res) => {
  try {
    const { products } = req.body;
    const user = req.userId;
    const items = products.map((product, index) => ({
      id: index + 1,
      title: product.title,
      currency_id: 'ARS',
      picture_url: product.image,
      description: product.description,
      category_id: 'art',
      quantity: 1,
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

module.exports = pet;