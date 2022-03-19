/*Antes de começar a configurar o Sequelize no projeto devemos iniciá-lo
,ou seja, criar os arquivos iniciais de configuração, e para isso 
executamos o comando:

./node_modules/.bin/sequelize init
ou
npx sequelize init

Esse processo deve criar alguns arquivos no projeto, como a pasta config, 
migrations, models e seeders.
Renomeamos o arquivo config/config.json para 
configurações/db.config.js e colocamos o código abaixo:
https://blog.rocketseat.com.br/nodejs-express-sequelize/*/

module.exports = {
    HOST: process.env.DATABASE_URL,
    //USER: process.env.DB_USER,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };