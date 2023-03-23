const { Router } = require('express');
const { authToken, isModerator } = require('../Middlewares/authToken');
const { getAllPets, createPet, updatePet, deletePet, getPet, getFourPet, createPayment } = require('../Controllers/petController');

const router = Router();

// USER --
router.get('/firtsPets', getFourPet);
router.get('/', getAllPets);
router.get('/:id', getPet);

// router.post('/', createPayment) // post para pagos en mercadopago

// ADMIN --
router.post('/create', authToken, isModerator, createPet);
router.put('/update/:id', authToken, isModerator, updatePet);
router.delete('/delete/:id', authToken, isModerator, deletePet);

module.exports = router;
