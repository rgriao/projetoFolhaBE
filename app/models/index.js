const dbConfig = require("../configurações/db.config.js");
const Sequelize = require("sequelize");
//conecta ao banco de dados
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, 
  dbConfig.PASSWORD, {    
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  define: {
    timestamps: false
  }
});

/*sequelize.beforeConnect(async (currConfig) => {
  try {
      await sequelize.authenticate();
      console.log('A conexão foi estabelecida com sucesso!');
  } catch (error) {
      console.error('Não foi possível se conectar à base de dados!', error);
  }
});*/

//cria a tabela real conforme modelo
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.dadosfolhas = require("./CamposFolha.js")(sequelize, Sequelize);

module.exports = db;