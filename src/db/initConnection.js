const mongoose = require('mongoose');
const { inspect } = require('util');

module.exports = function connectToDb() {
  const { MONGO_CONNECTION_STRING } = process.env;
  mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true });

  const db = mongoose.connection;

  db.on('error', (ex) => console.error(`Error connecting to mongo. ${inspect(ex)}`));
  db.once('open', () => console.log('Successfully connected to mongodb'));
  
}
