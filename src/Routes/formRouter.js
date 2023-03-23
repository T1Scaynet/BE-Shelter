const { Router } = require('express');
const { postForm, deleteForm, getAllForms, getAForm } = require('../Controllers/formController');
const { authToken, isAdmin } = require('../Middlewares/authToken');

const router = Router();

// CLIENT --
router.post('/', postForm);

// ADMIN --
router.delete('/:id', authToken, isAdmin, deleteForm);
router.get('/', authToken, isAdmin, getAllForms);
router.get('/:id', authToken, isAdmin, getAForm);

module.exports = router;
