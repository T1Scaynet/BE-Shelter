const { Router } = require('express');
const { createPayment } = require('../Controllers/paymentController');
const { authToken } = require('../Middlewares/authToken');

const router = Router();

router.post('/', authToken, createPayment); // post para pagos en mercadopago

module.exports = router;
