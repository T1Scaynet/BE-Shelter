const { Router } = require('express');
const { getAllPets, createPet, updatePet, deletePet, getPet, getFourPet } = require('../Controllers/petController');

const router = Router();

// ADMIN
router.post('/create', createPet);
router.put('/update/:id', updatePet);
router.delete('/delete/:id', deletePet);
router.get('/firtsPets', getFourPet);
router.get('/', getAllPets);
router.get('/:id', getPet);

// ADMIN --
router.post('/create', createPet);
router.put('/update/:id', updatePet);
router.delete('/delete/:id', deletePet);

module.exports = router;
