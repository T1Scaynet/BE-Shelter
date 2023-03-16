const express = require('express');
const morgan = require('morgan');

const server = express();

// Middlewares
server.use(express.json());
server.use(morgan('dev'));

// Routes
server.use('/', require('../Routes/prueba'));
server.use('/', require('../Routes/comment'));
server.use('/', require('../Routes/petRoute'));
server.use('/', require('../Routes/formRouter'));

module.exports = {
  server
};
