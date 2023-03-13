const { request, response } = require('express')

const pruebaGet = (req = request, res = response) => {
  res.status(200).send('Hello Word')
}

module.exports = {
  pruebaGet
}
