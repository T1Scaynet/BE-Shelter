const { Router } = require('express');
const { postForm, deleteForm, getAllForms, getAForm } = require('../Controllers/formController');

const router = Router();

// CLIENT --
router.post('/', postForm);

// ADMIN --
router.delete('/:id', deleteForm);
router.get('/', getAllForms);
router.get('/:id', getAForm);

module.exports = router;
