const { Router } = require('express');
const { getAllPets, createPet, updatePet, deletePet, getPet, getNamePets } = require('../Controllers/petController');

const router = Router();

router.get('/', getAllPets);
router.get('/:id', getPet);
router.get('/pets', getNamePets) // searchbar

// ADMIN
router.post('/create', createPet);
router.put('/update/:id', updatePet);
router.delete('/delete/:id', deletePet);
router.get('/', getAllPets);
router.get('/:id', getPet);

// ADMIN --
router.post('/create', createPet);
router.put('/update/:id', updatePet);
router.delete('/delete/:id', deletePet);

module.exports = router;
