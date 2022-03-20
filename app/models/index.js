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

//visa apenas verificar se houve conexão com sucesso
/*sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });*/

//Sequelize cria a tabela no PG conforme modelo
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.dadosfolhas = require("./CamposFolha.js")(sequelize, Sequelize);

module.exports = db;