const Sequelize = require("sequelize");
const { conexao } = require("../config/connection");

  const ContadorVisitante = conexao().define("contadorvisitante", {
    idcontador: {   	
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    },       
    contador: {  
    type: Sequelize.INTEGER,   
    allowNull: true
    },
    })
    ContadorVisitante.sync({ 
        alter : true,
        force: false,
    });      
    module.exports = ContadorVisitante;