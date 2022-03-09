const mongoose = require('mongoose');

/**
 * Close connection to the database.
 *
 * @return {Promise<void>}
 */
const close = async () => {
  return await mongoose.connection.close();
};

/**
 * Connect to the database.
 *
 * @param {string} uri db uri
 * @param {ConnectOptions} options connect options
 * @return {Promise<Mongoose>}
 */
const connect = async (uri, options = { useNewUrlParser: true }) => {
  if (process.argv.indexOf('--debug-mongoose') > -1) {
    mongoose.set('debug', true);
  }
  return await mongoose.connect(uri, options);
};

const getDBUrl = ({ host, port, name, username, password }) => {
  if (username && password) {
    return `mongodb://${username}:${password}@${host}:${port}/${name}`;
  }
  return `mongodb://${host}:${port}/${name}`;
};

module.exports = {
  close,
  connect,
  getDBUrl,
  mongoose,
};
