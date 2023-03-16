const { Router } = require('express');
const { login, register, updateUser, deleteUser, getUser } = require('../Controllers/userController');

const router = Router();

router.post('/login', login);
router.post('/register', register);
// CLIENT --
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);
// ADMIN --
router.get('/:id', getUser);

module.exports = router;
