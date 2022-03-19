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
    HOST: "postgres://frrzfkbshgxnzm:607ccff1c0386e1409b6497f8516b75bdcce48d67f05aea75aa674dc2777e211@ec2-54-198-73-79.compute-1.amazonaws.com:5432/desi6576mj2kdf",
    USER: "postgres",
    PASSWORD: "ur13ricar",
    DB: "CNAB240",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };