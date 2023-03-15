const express = require('express');
const morgan = require('morgan');
const petRoute = require('../Routes/petRoute');

const server = express();

// Middlewares
server.use(express.json());
server.use(morgan('dev'));

// Routes
server.use('/', require('../Routes/prueba'));
server.use('/pet', petRoute);

module.exports = {
  server
};
