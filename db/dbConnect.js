const mongoose = require('mongoose');
require('dotenv').config();

async function dbConnect() {
    console.log('process.env.DB_URL: ', process.env.DB_URL);
  mongoose.connect(
    process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => console.log('Connected to database'))
  .catch((error) => console.log('Error connecting to database', error));
}

module.exports = dbConnect;