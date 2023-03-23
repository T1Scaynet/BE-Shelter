const { Router } = require('express');
const { login, register, updateUser, deleteUser, getUser, profile, getAllUser } = require('../Controllers/userController');
const { authToken, isAdmin } = require('../Middlewares/authToken');
const { forgotPassword, resetPassword } = require('../Controllers/emailController');
const router = Router();

// USER --
router.post('/login', login);
router.post('/register', register);
// EMAIL
router.post('/forgot', forgotPassword);
router.post('/reset', resetPassword);

// CLIENT --
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);
router.get('/profile', authToken, profile);

// ADMIN --
router.get('/:id', authToken, isAdmin, getUser);
router.get('/', authToken, isAdmin, getAllUser);

module.exports = router;
