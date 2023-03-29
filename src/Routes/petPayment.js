const { Router } = require('express');
const { createPayment, getAllPayments, getPayment, deletePayment, updatePayment } = require('../Controllers/paymentController');
const { authToken, isAdmin } = require('../Middlewares/authToken');

const router = Router();

router.post('/', authToken, createPayment); // post para pagos en mercadopago

router.get('/', authToken, isAdmin, getAllPayments);
router.get('/:id', authToken, isAdmin, getPayment);
router.delete('/delete/:id', authToken, isAdmin, deletePayment);
router.put('/update/:id', authToken, isAdmin, updatePayment);

module.exports = router;
