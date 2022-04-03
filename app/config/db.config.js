if (process.env.NODE_ENV !== 'development') require('dotenv').config();

console.log(process.env.DATABASE_URL);
if (process.env.NODE_ENV === "development") {
var config = {
  development: {
    HOST: "localhost",
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
  }
}
}
if (process.env.NODE_ENV === "text") {
  var config = {
    
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    dialect: 'postgres',
    port: process.env.PG_PORT,
    operatorsAliases: 0,
  }
}
if (process.env.NODE_ENV === "production") {
  var config = {
    use_env_variable: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: true,
    }
  }
}
