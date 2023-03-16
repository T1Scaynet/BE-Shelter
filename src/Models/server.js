const express = require('express');
const morgan = require('morgan');
const petRoute = require('../Routes/petRoute');
const userRoute = require('../Routes/userRoute');
const { createPet, getAllPets } = require('../Controllers/petController');

const server = express();

// Middlewares
server.use(express.json());
server.use(morgan('dev'));

// Routes
server.use('/', require('../Routes/prueba'));
server.use('/', require('../Routes/comment'));
server.use('/', require('../Routes/petRoute'));
server.use('/', require('../Routes/formRouter'));
server.use('/pet', petRoute);
server.use('/user', userRoute);

module.exports = {
  server
};
