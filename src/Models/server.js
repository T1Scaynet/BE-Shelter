const express = require('express');
const morgan = require('morgan');
const { createPet, getAllPets } = require('../Controllers/petController');


const server = express();

// Middlewares
server.use(express.json());
server.use(morgan('dev'));

// Routes
server.use('/', require('../Routes/prueba'));
server.use('/pet', getAllPets);
server.use('/create', createPet);
server.use('/', require('../Routes/comment'));
server.use('/pet', petRoute);

module.exports = {
  server
};
