const mongoose = require('mongoose');
require('dotenv').config();

// String para la conexion con MongoDB Atlas
const connection = `mongodb+srv://admin:${process.env.DB_PASSWORD}@db-refugio.lmdbpnj.mongodb.net/test`;

const mongoDB = () => {
  mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true

  })
    .then(() => {
      console.log('db connected');
    })
    .catch(error => {
      console.error(error);
    });
};

mongoose.set('strictQuery', false); // Este set es para evitar errores de version de mongoose
mongoDB();
