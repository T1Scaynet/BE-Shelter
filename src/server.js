const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const petRoute = require('./Routes/petRoute');
const userRoute = require('./Routes/userRoute');
const commentRoute = require('./Routes/commentRoute');
const formRoute = require('./Routes/formRouter');
const { getNamePets } = require('./Controllers/petController'); // esta es la funcion que uso para la ruta de la searchbar

const server = express();

// Middlewares
server.use(cors());
server.use(express.json());
server.use(morgan('dev'));

// Routes
server.use('/comment', commentRoute);
server.use('/form', formRoute);
server.use('/pet', petRoute);
server.use('/user', userRoute);
server.use('/pets', getNamePets) // este es la ruta para buscar perros por su nombre para la search bar

module.exports = {
  server
};
