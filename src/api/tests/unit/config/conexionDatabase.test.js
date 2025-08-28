const {sequelize} = require('../../../../config/sequalize');
const app = require('../../../../index');
const server = app.server;

afterAll(async () => {
  if (server) {
    server.close(); // Cierra el servidor
  }
  await new Promise(resolve => setTimeout(resolve, 500));
  await sequelize.close();
}, 10000);

describe('Prueba de conexión a la base de datos', () => {
  test('Debería establecer una conexión a la base de datos', async () => {
    try {
      await sequelize.authenticate();
      console.log('Conexión establecida correctamente.');
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
    }
  });
});
