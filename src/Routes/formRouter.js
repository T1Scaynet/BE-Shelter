const { Router } = require('express');
const { postForm, deleteForm, getAllForms, getForm, stateForm } = require('../Controllers/formController');
const { postContactForm, getAllContactForms, getAContactForm, deleteContactForm } = require('../Controllers/contactForm');
const { authToken, isAdmin } = require('../Middlewares/authToken');
const { validateFields } = require('../Middlewares/validate-fields');
const { check } = require('express-validator');

const router = Router();

// CLIENT --
router.post('/', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('lastName', 'El apellido es obligatorio').not().isEmpty(),
  check('email', 'El correo no es válido').isEmail(),
  check('phone', 'El telefono es obligatorio').not().isEmpty(),
  check('address', 'La direccion es obligatoria').not().isEmpty(),
  validateFields,
  authToken
], postForm);

router.post('/contact', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('lastName', 'El apellido es obligatorio').not().isEmpty(),
  check('email', 'El correo no es válido').isEmail(),
  check('phone', 'El telefono es obligatorio').not().isEmpty(),
  check('message', 'Debe mandar algun mensaje').not().isEmpty(),
  validateFields
], postContactForm); // form para contactarse

// ADMIN --
router.get('/contact/:id', getAContactForm); // forms para contactarse
router.get('/contact', getAllContactForms); // forms para contactarse
router.delete('/contact/:id', deleteContactForm); // forms para contactarse

router.delete('/:id', authToken, isAdmin, deleteForm);
router.get('/', authToken, isAdmin, getAllForms);
router.get('/:id', authToken, isAdmin, getForm);
router.put('/:id', authToken, isAdmin, stateForm);

module.exports = router;
