// make bluebird default Promise
//Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port, env } = require('./config/vars');
const { logger } = require('./config/logger');
const app = require('./config/express');
const { sequelize } = require('./config/sequalize');
const routes = require('./api/routes/v1/index');
const mongoose = require('./config/mongoose');

// eslint-disable-next-line no-multiple-empty-lines

// open mongoose connection
// eslint-disable-next-line spaced-comment
//mongoose.connect();

// sql server conexion
sequelize.sync()
  .then(() => logger.info('Conexion exitosa'))
  .catch((error) => logger.info('Error de conexion a sql server', error));

// listen to requests
const server = app.listen(port,'0.0.0.0', () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`server on ${host} / ${port}`)
  logger.info(`server started on port ${port} (${env})`)
});

/**
* Exports express
* @public
*/
module.exports = app;

module.exports.server = server;