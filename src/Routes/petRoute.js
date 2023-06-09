/* eslint-disable no-unused-vars */
const { Router } = require('express');
const { authToken, isModerator, isAdmin } = require('../Middlewares/authToken');
const { getAllPets, createPet, updatePet, deletePet, getPet, getFourPet, getAllModerator } = require('../Controllers/petController');
const { validateFields } = require('../Middlewares/validate-fields');
const { check } = require('express-validator');
const router = Router();

// USER --
router.get('/firtsPets', getFourPet);
router.get('/', getAllPets);
router.get('/:id', getPet);

// router.post('/', createPayment) // post para pagos en mercadopago

// ADMIN --
router.post('/create', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('type', 'El tipo es obligatorio').not().isEmpty(),
  check('genre', 'El genero no es válido').not().isEmpty(),
  check('age', 'La edad es obligatoria').not().isEmpty(),
  check('state', 'El estado es obligatorio').not().isEmpty(),
  check('size', 'El tamaño es obligatorio').not().isEmpty(),
  check('weight', 'El peso es obligatorio').not().isEmpty(),
  check('vaccine', 'El campo vacunas es obligatorio').not().isEmpty(),
  check('history', 'El campo historia es obligatorio').not().isEmpty(),
  check('disability', 'El campo discapacidad es obligatorio').not().isEmpty(),
  validateFields,
  authToken,
  isAdmin || isModerator
], createPet);
router.put('/update/:id', authToken, isAdmin || isModerator, updatePet);
router.delete('/delete/:id', authToken, isAdmin || isModerator, deletePet);
router.get('/admin/getPets', authToken, isAdmin || isModerator, getAllModerator);

module.exports = router;
