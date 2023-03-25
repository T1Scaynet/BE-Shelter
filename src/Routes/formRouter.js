const { Router } = require('express');
const { postForm, deleteForm, getAllForms, getForm, stateForm } = require('../Controllers/formController');
const { authToken, isAdmin } = require('../Middlewares/authToken');

const router = Router();

// CLIENT --
router.post('/', authToken, postForm);

// ADMIN --
router.delete('/:id', authToken, isAdmin, deleteForm);
router.get('/', authToken, isAdmin, getAllForms);
router.get('/:id', authToken, isAdmin, getForm);
router.put('/:id', authToken, isAdmin, stateForm);

module.exports = router;
