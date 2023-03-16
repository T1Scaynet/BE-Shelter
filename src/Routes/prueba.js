const { Router } = require('express')
const { pruebaGet } = require('../Controllers/prueba')
const { getAllPets } = require('../Controllers/petController')

const router = Router()

router.get('/', getAllPets)

module.exports = router
 