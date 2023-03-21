const mercadopago = require('mercadopago');

const pet = {};

// http://localhost:3001/payment esta es la ruta
// Este es un json de ejemplo de como agregar productos para probrar en el postman
// {
//     "title":"Castracion",
//     "category":"Donacion",
//     "description": "Esta es una donacion para una castracion de un perrito",
//     "price": 50000
//   }

//Este es para un solo producto
// pet.createPayment = async (req, res) => {
//     try {
//       const products = req.body;
//       const preference = {
//         items: [{
//           id: 1,
//           title: products.title,
//           currency_id: 'ARS',
//           picture_url: products.image,
//           description: products.description,
//           category_id: 'art',
//           quantity: 1,
//           unit_price: products.price
//         }],
//         back_urls: {
//           success: 'http://localhost:3000',
//           failure:'',
//           pending:'',
//         },
//         auto_return: 'approved',
//         binary_mode: true,
//       };
//       const response = await mercadopago.preferences.create(preference);
//       res.status(200).send(response);
//     } catch (error) {
//       res.status(400).send({ error: error.message });
//     }
//   };

//Este es por si quieres agregar mas de un producto
pet.createPayment = async (req, res) => {
    try {
      const products = req.body;
      const preference = {
        items: [
          {
            id: 1,
            title: products[0].title,
            currency_id: 'ARS',
            picture_url: products[0].image,
            description: products[0].description,
            category_id: 'art',
            quantity: 1,
            unit_price: products[0].price
          },
          {
            id: 2,
            title: products[1].title,
            currency_id: 'ARS',
            picture_url: products[1].image,
            description: products[1].description,
            category_id: 'art',
            quantity: 1,
            unit_price: products[1].price
          }
        ],
        back_urls: {
          success: 'http://localhost:3000',
          failure:'',  // Aca agregar el link al que quieres que vaya cuando falla la compra
          pending:'',  // Aca es por si se quiere pagar en efectivo, queda pendiente hasta que se efectue el pago, pero todavia no vi eso 
        },
        auto_return: 'approved',
        binary_mode: true,
      };
      const response = await mercadopago.preferences.create(preference);
      res.status(200).send(response);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  
  

module.exports = pet;