const { Router } = require('express');
const { forgotPassword, resetPassword } = require('../Controllers/emailController')
const { login, register, updateUser, deleteUser, getUser } = require('../Controllers/userController');

const router = Router();

// USER --
router.post('/login', login);
router.post('/register', register);
// EMAIL
router.post('/forgot', forgotPassword)
router.post('/reset', resetPassword)

// CLIENT --
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

// ADMIN --
router.get('/:id', getUser);

module.exports = router;
