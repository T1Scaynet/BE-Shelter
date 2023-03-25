const { Router } = require('express');
const { createPayment } = require('../Controllers/paymentController');

const router = Router();

router.post('/', createPayment); // post para pagos en mercadopago

module.exports = router;
