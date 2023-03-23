const { Router } = require('express');
const { getAllPets, createPet, updatePet, deletePet, getPet, getFourPet } = require('../Controllers/petController');
const { authToken, isModerator } = require('../Middlewares/authToken');

const router = Router();

// USER --
router.get('/firtsPets', getFourPet);
router.get('/', getAllPets);
router.get('/:id', getPet);

// ADMIN --
router.post('/create', authToken, isModerator, createPet);
router.put('/update/:id', authToken, isModerator, updatePet);
router.delete('/delete/:id', authToken, isModerator, deletePet);

module.exports = router;
