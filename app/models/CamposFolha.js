/*Sequelize permite criar, buscar, alterar e remover dados do
banco de dados utilizando métodos JS, além de permitir a
modificação da estrutura das tabelas com sync(alter : true). Os models da aplicação
são a representação das tabelas do banco de dados em forma
de classe, pois assim podemos manipulá-las mais
facilmente através do código, ao alterar a estrutura das tabelas
devemos atualizar o migrations para refletir as 
mudanças para a equipe.*/

module.exports = (sequelize, Sequelize) => {  
    const DadosFolha = sequelize.define("dadosfolha", {
    idfolhapagamento: {   	
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    },       
    nomedobanco: {  
    type: Sequelize.STRING(30)   
    },
    codigodobanco: {
    type: Sequelize.STRING(3)
    },
    nomedaempresa: {  
    type: Sequelize.STRING(30)    
    },
    cnpj: {  
    type: Sequelize.STRING(14)     
    },    
    enderecoempresa: {  
    type: Sequelize.STRING(30) 
    },
    ndolocalempresa: {  
    type: Sequelize.STRING(5) 
    },
    complementoempresa: {  
    type: Sequelize.STRING(15) 
    },         
    cidadeempresa: {  
    type: Sequelize.STRING(20) 
    },
    cepempresa: {  
    type: Sequelize.STRING(5) 
    },
    complementodocepempresa: {  
    type: Sequelize.STRING(3) 
    },
    sigladoestadoempresa: {  
    type: Sequelize.STRING(2) 
    },
    debitocontaempresa: {  
    type: Sequelize.STRING(1) 
    },
    codigoconvenio: {  
    type: Sequelize.STRING(20) 
    },
    agenciaempresa: {  
    type: Sequelize.STRING(5) 
    },
    digitodaagenciaempresa: {  
    type: Sequelize.STRING(1) 
    },
    ndacontaempresa: {  
    type: Sequelize.STRING(12) 
    },
    digitodacontaempresa: {  
    type: Sequelize.STRING(1)
     },
    digitoverificadoragcontaempresa: {  
    type: Sequelize.STRING(1) 
    },
    nomedofuncionario: {  
    type: Sequelize.STRING(30) 
    },
    cpfdofuncionario: {  
    type: Sequelize.STRING(14) 
    },
    enderecofuncionario: {  
    type: Sequelize.STRING(35) 
    },
    ndolocalfuncionario: {  
    type: Sequelize.STRING(5) 
    },
    complementofuncionario: {  
    type: Sequelize.STRING(15) 
    },
    bairrofuncionario: {  
    type: Sequelize.STRING(15) 
    },
    cidadefuncionario: {  
    type: Sequelize.STRING(15) 
    },
    cepfuncionario: {  
    type: Sequelize.STRING(5) 
    },
    complementodocepfuncionario: {  
    type: Sequelize.STRING(3) 
    },
    sigladoestadofuncionario: {  
    type: Sequelize.STRING(2) 
    },
    agenciafuncionario: {  
    type: Sequelize.STRING(5) 
    },
    digitodaagenciafuncionario: {  
    type: Sequelize.STRING(1) 
    },
    ndacontafuncionario: {  
    type: Sequelize.STRING(12) 
    },
    digitodacontafuncionario: {  
    type: Sequelize.STRING(1) 
    },
    digitoverificadordaagcontafuncionario: {  
    type: Sequelize.STRING(1) 
    },
    datadopagamento: {  
    type: Sequelize.STRING(8) 
    },
    valordopagamento: {  
    type: Sequelize.STRING(15) 
    },    
    });     
    DadosFolha.sync({ 
      alter : true,
      force: false,
    });
    //https://wharley.github.io/sequelize-com-database-existente-postgres/
    //console.log ("******************************************Entrou no sequelize e os dados são:" + DadosFolha);
    return (DadosFolha); 
        
  };