const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
  const dbURL = config.get('dbURL');
  mongoose
    .connect(dbURL)
    .then(() => console.log('connected to mongodb'))
    .catch(() => console.log('Failed to connect mongodb'));
};
