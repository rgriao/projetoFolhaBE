module.exports = {
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
  };