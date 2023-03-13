const { Router } = require('express')
const { pruebaGet } = require('../Controllers/prueba')

const router = Router()

router.get('/', pruebaGet)

module.exports = router
