const Sequelize = require('sequelize');
const dbConfig = require("../config/db.config");

if (process.env.NODE_ENV === "production") {
sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);
}
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "text") {
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, 
  dbConfig.PASSWORD, {    
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  define: {
    timestamps: false
  }
});
}
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