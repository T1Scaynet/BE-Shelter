const mercadopago = require('mercadopago');
const generateReceipt = require('mercadopago');
const Payment = require('../Models/paymentModel');

const payment = {};

// // http://localhost:3001/payment esta es la ruta

payment.createPayment = async (req, res) => {
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
      binary_mode: true,
      receipt: {
        header: 'Comprobante de pago',
        footer: 'Gracias por su compra'
      }
    };
    const response = await mercadopago.preferences.create(preference);
    console.log(response.body.auto_return);
    const newPayment = new Payment({
      idUser: user,
      amount: products.reduce((total, product) => total + product.price, 0),
      title: products.map(product => product.title).join(', '),
      status: response.body.auto_return,
      url: response.body.init_point
    });
    await newPayment.save();

    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

payment.downloadReceipt = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({
        msg: 'The payment not found.'
      });
    }
    // Generar el comprobante de pago utilizando la información de la base de datos
    const receipt = generateReceipt(payment);
    // Devolver el comprobante como una respuesta para descargar
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=comprobante.pdf');
    res.send(receipt);
  } catch {
    return res.status(400).json({
      msg: 'Ocurrio un problema, intentalo nuevamente.'
    });
  }
};

payment.getAllPayments = async (req, res) => {
  const { title, status, sort, page = 1, limit = 8 } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    populate: ({ path: 'idUser', select: ['name', 'email', 'lastName'] })
  };

  const filters = {};

  if (title) {
    filters.title = title;
  };

  if (status) {
    filters.status = status;
  };

  const sortOptions = {};

  if (sort === 'old') {
    sortOptions.createAt = 1;
  };

  if (sort === 'recent') {
    sortOptions.createAt = -1;
  };

  try {
    const allPayments = await Payment.paginate({ ...filters }, {
      ...options,
      sort: sortOptions
    });

    return res.status(200).json({
      totalPages: allPayments.totalPages,
      currentPage: allPayments.page,
      totalItems: allPayments.totalDocs,
      filters,
      payments: allPayments.docs
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'Ocurrio un problema, intentalo nuevamente.'
    });
  }
};

payment.getPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate({ path: 'idUser', select: ['name', 'email', 'lastName'] });
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
    return res.status(400).json({
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
