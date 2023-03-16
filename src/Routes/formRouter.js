const { Router } = require('express');
const { postForm, deleteForm, getAllForms, getAForm } = require('../Controllers/formController');

const router = Router();

router.post('/form', postForm); // mandar el form
router.delete('/form/:id', deleteForm); // borrar un form
router.get('/form', getAllForms); // todos los form
router.get('/form/:id', getAForm); // un form

// router.get('/', pruebaGet)

module.exports = router;
