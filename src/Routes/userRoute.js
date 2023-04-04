const { Router } = require('express');
const { login, register, updateUser, deactivateUser, getUser, profile, getAllUser, createUser, updateActive, deleteUserByAdmin } = require('../Controllers/userController');
const { authToken, isAdmin } = require('../Middlewares/authToken');
const { forgotPassword, resetPassword } = require('../Controllers/emailController');
const { check } = require('express-validator');
const { validateFields } = require('../Middlewares/validate-fields');
const router = Router();

// USER --
router.post('/login', [
  check('email', 'El correo no es válido').isEmail(),
  check('password', 'La contraseña es incorrecta'),
  validateFields
], login);
router.post('/register', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe ser más de 6 letras').isLength({ min: 6 }),
  check('email', 'El correo no es válido').isEmail(),
  validateFields
], register);

// EMAIL --
router.post('/forgot', forgotPassword);
router.post('/reset', resetPassword);

// CLIENT --
router.put('/update', authToken, updateUser);
router.put('/deactivate', authToken, deactivateUser);
router.get('/profile', authToken, profile);

// ADMIN --
router.get('/:id', authToken, isAdmin, getUser);
router.get('/', getAllUser);
router.post('/create', authToken, isAdmin, createUser);
router.put('/updateActive/:id', authToken, isAdmin, updateActive);
router.delete('/deleteUser/:id', authToken, isAdmin, deleteUserByAdmin);

module.exports = router;
