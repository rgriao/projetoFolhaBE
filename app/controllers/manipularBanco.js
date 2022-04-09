var express = require('express');
var router = express.Router();
const TabelaFolha = require("../models/TabelaFolha");
const TabelaContador = require("../models/TabelaContador");

const { AjustaHeaderArquivo } = require("../models/HeaderArquivo");
const { AjustaHeaderLote } = require("../models/HeaderLote");
const { AjustaSegmentos } = require("../models/DetalheSegmentos");
const { AjustaTrailerArquivo } = require("../models/TrailerArquivo");
const { AjustaTrailerLote } = require("../models/TrailerLote");
const { DeletaRegistros } = require("./processamentos");

router.post('/add', async function (req, res) {

  var TxtFinal = [];    

  //incluir o contador na talela contadorvisitantes
//https://pt.stackoverflow.com/questions/450775/select-no-sequelize
/*TabelaContador.findOne({ where: { idcontador: 1 } })
.then (() => { 
  console.log("🔥🔥🔥 *************achou 1 contador: " + TabelaContador.contador + " ***************🔥🔥🔥")
  TabelaContador.contador = TabelaContador.contador + 1;
  TabelaContador.save();   
  })
.catch(err => {
  console.log("🔥🔥🔥 *************Entrou no err para criar reg novo: ***************🔥🔥🔥")
  TabelaContador.create({           
    contador: 1    
  });  
});
//TabelaContador.save();*/

const [tabelaContador, created] = await TabelaContador.findOrCreate({
 where: { idcontador: 1 } }) 
 defaults: {
  contador: 1
}
if (!created){
  console.log("🔥🔥🔥 *************TabelaContador.contador:  " + tabelaContador.contador + "  ***************🔥🔥🔥")
  x = tabelaContador.contador + 1;  
  tabelaContador.update(
    { contador: x 
  })  
  tabelaContador.save();
}

 
  DeletaRegistros(req.body[0].cnpj).then(() => { 
   TabelaFolha.bulkCreate(req.body)         
    .then(() => {   
     AjustaHeaderArquivo(req.body[0].cnpj).then((aharesolveu) => { 
      TxtFinal.push(aharesolveu); 
        }).then(() => {  
          AjustaHeaderLote(req.body[0].cnpj).then((ahlresolveu) => {
          TxtFinal.push(ahlresolveu);           
            }).then(() => {
              AjustaSegmentos(req.body).then((asaresolveu) => {
               TxtFinal.push(asaresolveu);                                       
                 }).then(() => {                           
                   AjustaTrailerLote(req.body).then((tloteresolveu) => {
                   TxtFinal.push(tloteresolveu);                                                                          
                    }).then(() => {
                      AjustaTrailerArquivo(req.body).then((tarqresolveu) => {
                      TxtFinal.push(tarqresolveu); 
                      }).then(() => {                    
                      DeletaRegistros(req.body[0].cnpj).then(() => {     
                      //console.log("🔥🔥🔥 Entrou no DeletaRegistros do manipulador: 🔥🔥🔥")           
                      res.send(TxtFinal);                            
                      });
                    });
                  });
              });
            });
        });
    }) 
  .catch(err => {              
    console.log("Ocorreu algum erro ao alimentar a tabela TabelaFolha!" + err);  
  });
 });  
});
//});  
router.get('/', function (req, res) {   
  TabelaContador.findOne({ where: { idcontador: 1 } 
  }).then(data => {
    //TabelaContador.sync({force: true}).then(() => { 
      console.log("🔥🔥🔥 entrou no send:  " + data.contador + "  🔥🔥🔥")
      res.send(data);  
     //});
    })
    .catch(err => {       
      console.log("Ocorreu algum erro ao buscar a quantidade de visitantes!" + err)      
      });
    });
 
  module.exports = router;