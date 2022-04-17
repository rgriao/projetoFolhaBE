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
const [tabelaContador, created] = await TabelaContador.findOrCreate({
 where: { idcontador: 1 } }) 
 defaults: {
  contador: 1
}
if (!created){  
  x = tabelaContador.contador + 1;  
  tabelaContador.update(
    { contador: x 
  })  
  tabelaContador.save();
}
//console.log("🔥🔥🔥 *************TabelaContador.contador:  " + req.body[0].nomedaempresa + "  ***************🔥🔥🔥")
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
router.get('/conta', function (req, res) {   
  TabelaContador.findOne({ where: { idcontador: 1 } 
  }).then(data => {    
      console.log("🔥🔥🔥 entrou no send BE:  " + data.contador + "  🔥🔥🔥")
      res.send(data);  
     })
    .catch(err => {       
      console.log("Ocorreu algum erro ao buscar a quantidade de visitantes no BE!" + err)      
      });
    }); 
  module.exports = router;