require('dotenv').config();

module.exports = {
  development: {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,    
    port: process.env.PG_PORT,
    dialect: 'postgres',      
    pool: {
      max: parseInt(process.env.PG_POOL_MAX),
      min: parseInt(process.env.PG_POOL_MIN),
      acquire: parseInt(process.env.PG_POOL_ACQUIRE),
      idle: parseInt(process.env.PG_POOL_IDLE),
    },
  },
  test: {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,    
    port: process.env.PG_PORT,
    dialect: 'postgres',   
  },
  production: {
    use_env_variable: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: true,
    },
  },
};

