const Sequelize = require('sequelize');
sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

//visa apenas veriicar se houve a conexão com sucesso
/*sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });*/

//Cria a tabela real conforme modelo
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.dadosfolhas = require("./CamposFolha.js")(sequelize, Sequelize);

module.exports = db;