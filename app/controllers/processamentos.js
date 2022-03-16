const db = require("../models/index");
const DadosFolha = db.dadosfolhas;

exports.DeletaRegistros = (requisicao) => new Promise 
((aResolver, aRejeitar) => {  
        DadosFolha.destroy({where: {cnpj: requisicao}})        
        .then(() => {
        exports.del = true;
        aResolver(exports.del);
        })
        .catch(err => {
        aRejeitar("Ocorreu um errro ao tentar deletar os registros do usuário!" + err);
        });
});
exports.GeraData = () => {
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
var hoje = dd+mm+yyyy;
//console.log("****************************Entrou no GeraData***********************" + hoje);
return hoje;
};

exports.GeraHora = () => {
var today = new Date(); 
//console.log("****************************Entrou no GeraHora***********************" + today.getMinutes());
    if (today.getHours() < 10) {
      hor = '0' + today.getHours();
    } else {
      hor = today.getHours();
    }
    if (today.getMinutes() < 10) {
      minu = '0' + today.getMinutes();
    } else {
      minu = today.getMinutes();
    }
    if (today.getSeconds() < 10) {
      seg = '0' + today.getSeconds();
    } else {
      seg = today.getSeconds();
    }
var horas = String(hor)+String(minu)+String(seg);
return horas;
};

exports.BuscaQdeRegistros = (corpo) => { 
  //console.log("***********Entrou no BuscaQdeRegistros e a qde. é**** " + Object.keys(corpo).length); 
  var QdeRegistros = Object.keys(corpo).length;  
  return QdeRegistros;
};

exports.SomaPagamentos = (corpo) => new Promise 
((aResolver, aRejeitar) => {

  const x = new Promise(resolve => (y+0));
  var ValordoPag = 0.00;
  var QdeRegistros = Object.keys(corpo).length;
  //console.log("\n\n"+"***********Entrou no SomaPagamentos*************"+ QdeRegistros);

    for (let i = 0, p = Promise.resolve(); i < QdeRegistros; i++) {            
            p = p.then(() => DadosFolha.findOne({where: {nomedofuncionario: corpo[i].nomedofuncionario}})) 
            .then((folha) => {              
                ValordoPag = (parseFloat(ValordoPag) + parseFloat(folha.valordopagamento));//.toFixed(2); 
                //console.log("***********Entrou no SomaPagamentos e o valor é: *************" + ValordoPag);
            })                       
            .then(() => { 
                if (i === (QdeRegistros - 1)){
                //console.log("\n\n"+"***********Entrou no aResolver e o valor total é: *************" + ValordoPag +"\n\n");
                aResolver(ValordoPag);
            }
            })
            .catch(err => {
                aRejeitar({mensagem: "Ocorreu um errro ao tentar montar o setor AjustaSegmentoA!" + err});                
            });   
          
    }  

});
exports.CompletaCampos = (pos, text, qdeCasas, comZeroEspaco) => {
  //console.log("***********Entrou no CompletaCampos************" + txt);
  try{
  if (text === undefined || text === "") {
    text = " ";
  } 
  if (pos === "inicio") {
  var txt =  text.padStart(qdeCasas, comZeroEspaco);  
  //console.log("***********Entrou no CompletaCampos no início************" + txt + " / " + text);
  return txt;
  }
  if (pos === "fim") {
    var txt =  text.padEnd(qdeCasas, comZeroEspaco);  
  //console.log("***********Entrou no CompletaCampos no final************" + txt + " / " + text);
  return txt;
  }
  }catch(err){
    console.log(err);
  }
};