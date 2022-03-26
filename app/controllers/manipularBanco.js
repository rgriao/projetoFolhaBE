var express = require('express');
var router = express.Router();
const db = require("../models/index");
const DadosFolha = db.dadosfolhas;

const { AjustaHeaderArquivo } = require("../models/HeaderArquivo");
const { AjustaHeaderLote } = require("../models/HeaderLote");
const { AjustaSegmentos } = require("../models/DetalheSegmentos");
const { AjustaTrailerArquivo } = require("../models/TrailerArquivo");
const { AjustaTrailerLote } = require("../models/TrailerLote");
const { DeletaRegistros } = require("./processamentos");

router.post('/add', async function (req, res) {
//"express": "^4.16.1"
//await DadosFolha.bulkCreate(req.body)
  var TxtFinal = [];      
   //console.log("***********Entrou no POST-ADD:*************")
   
   await DeletaRegistros(req.body[0].cnpj).then(() => {   
    DadosFolha.bulkCreate(req.body)         
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
                                    // dar um refresh na página do html após clicar
                            });
                        });
                    });
                  });
            });
        });
      });
  })
  .catch(err => {
  res.status(500).send({          
  message: "Ocorreu algum erro ao alimentar a tabela dadosfolha!" + err
  });    
  });
  });
 /* router.get('/', async function (req, res) {
    DadosFolha.findAll()
      .then(response => {
        console.log(response.data);
        })
      .catch(e => {
        console.log(e);
      });
  });*/
  module.exports = router;