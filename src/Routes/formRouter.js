const { Router } = require('express');
const { postForm, deleteForm, getAllForms, getAForm } = require('../Controllers/formController');



const router = Router();

router.post('/', postForm); // mandar el form
router.delete('/:id', deleteForm); // borrar un form
router.get('/', getAllForms); // todos los form
router.get('/:id', getAForm); // un form


// router.get('/', pruebaGet)

module.exports = router;
