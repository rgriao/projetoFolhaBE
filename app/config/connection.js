const Sequelize = require("sequelize");
const dbConfig = require('./configDB');
      
exports.conexao = () => {

 if (process.env.NODE_ENV.trim() === 'development' || process.env.NODE_ENV.trim() === 'test') {    
  const conn = new Sequelize(dbConfig.development.database, dbConfig.development.user, 
   dbConfig.development.password, {         
   host: dbConfig.development.host,
   dialect: 'postgres',  
   define: {
     timestamps: false
     }  
   })    
   return (conn);
 }; 
}