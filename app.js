require('dotenv').config();
require('./src/db');
const { server } = require('./src/server');
const { PORT } = process.env;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
