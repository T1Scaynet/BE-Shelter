const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const mercadopago = require('mercadopago')

mercadopago.configure({access_token:process.env.MERCADOPAGO_KEY})

const petRoute = require('./Routes/petRoute');
const userRoute = require('./Routes/userRoute');
const commentRoute = require('./Routes/commentRoute');
const formRoute = require('./Routes/formRouter');
const createPayment = require('./Routes/petPayment');
const socialRoute = require('./Routes/socialRoute');

const server = express();

// Middlewares
server.use(cors());
server.use(express.json());
server.use(morgan('dev'));

server.use(
  session({
    secret: 'SECRETO',
    resave: false,
    saveUninitialized: false
  })
);

server.use(passport.initialize());
server.use(passport.session());

// Routes
server.use('/comment', commentRoute);
server.use('/form', formRoute);
server.use('/pet', petRoute);
server.use('/user', userRoute);
server.use('/payment', createPayment);
server.use('/social', socialRoute);

module.exports = {
  server
};
