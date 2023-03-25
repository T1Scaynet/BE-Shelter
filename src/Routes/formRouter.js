const { Router } = require('express');
const { postForm, deleteForm, getAllForms, getForm, stateForm } = require('../Controllers/formController');
const { postContactForm, getAllContactForms, getAContactForm, deleteContactForm } = require('../Controllers/contactForm');
const { authToken, isAdmin } = require('../Middlewares/authToken');

const router = Router();

// CLIENT --
router.post('/', authToken, postForm);
router.post('/contact', postContactForm); // form para contactarse

// ADMIN --
router.get('/contact/:id', getAContactForm); // forms para contactarse
router.get('/contact', getAllContactForms); // forms para contactarse
router.delete('/contact/:id', deleteContactForm); // forms para contactarse

router.delete('/:id', authToken, isAdmin, deleteForm);
router.get('/', authToken, isAdmin, getAllForms);
router.get('/:id', authToken, isAdmin, getForm);
router.put('/:id', authToken, isAdmin, stateForm);

module.exports = router;
