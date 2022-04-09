require('dotenv').config();

module.exports = {
  development: {
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,    
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,    
    pool: {
      max: parseInt(process.env.DB_POOL_MAX),
      min: parseInt(process.env.DB_POOL_MIN),
      acquire: parseInt(process.env.DB_POOL_ACQUIRE),
      idle: parseInt(process.env.DB_POOL_IDLE),
    },
  },
  test: {
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,    
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,   
  },
  production: {
    database: process.env.DATABASE_URL,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: true,
    },
  },
};

