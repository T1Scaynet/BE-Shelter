const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const petRoute = require('./Routes/petRoute');
const userRoute = require('./Routes/userRoute');
const commentRoute = require('./Routes/commentRoute');
const formRoute = require('./Routes/formRouter');

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

module.exports = {
  server
};
