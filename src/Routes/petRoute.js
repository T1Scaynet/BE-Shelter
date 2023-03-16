const { Router } = require('express');
const { getAllPets, createPet, updatePet, deletePet, getPet } = require('../Controllers/petController');

const router = Router();

router.get('/pet', getAllPets);
router.get('/pet/:id', getPet);
// ADMIN
router.post('/pet/create', createPet);
router.put('/pet/update/:id', updatePet);
router.delete('/pet/delete/:id', deletePet);

module.exports = router;
