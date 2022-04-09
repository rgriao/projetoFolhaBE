const Sequelize = require("sequelize");
const dbConfig = require('./configDB');
var conn = "";
exports.conexao = () => {
 if (process.env.NODE_ENV.trim() === 'development' || process.env.NODE_ENV.trim() === 'test') {    
  conn = new Sequelize(dbConfig.development.database, dbConfig.development.user, 
   dbConfig.development.password, {         
   host: dbConfig.development.host,
   dialect: 'postgres',  
   define: {
     timestamps: false
     }  
   })  
 }else{
  conn = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
   }
  );
 }
 return (conn);
}