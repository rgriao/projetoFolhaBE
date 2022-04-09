const TabelaFolha = require("../models/TabelaFolha");
const { CompletaCampos } = require("../controllers/processamentos");
const { BuscaQdeRegistros, SomaPagamentos } = require("../controllers/processamentos")

exports.AjustaTrailerArquivo = (corpo) => new Promise 
((aResolver, aRejeitar) => {
//recebe o cnpj para buscar os dados
var espaco5 = "     ";
var espaco9 = "         ";
var espaco20 = "                    ";
var espaco30 = "                              ";
var digito6 = "000000";   

//console.log("************Entrou no AjustaTrailerArquivo com cnpj: " + corpo[0].cnpj + "- Glória a Deus!")

var textoTrailerArquivo = [];
var QdeRegistros = ((BuscaQdeRegistros(corpo)*2)+4).toString();
//console.log("*****TrailerArquivo*******QdeRegistros******* " + QdeRegistros);
//.then (() => {

TabelaFolha.findOne({where: {cnpj: corpo[0].cnpj}})
.then(folha => {    
//com base no cnpj pesquisa os dados
textoTrailerArquivo = [folha.codigodobanco,"9999","9",espaco9,"000001",CompletaCampos("inicio",QdeRegistros,6,"0"),
digito6,espaco30+espaco30+espaco30+espaco30+espaco30+espaco30+
espaco20+espaco5+"\n"]
})
.then(() => {  
    //console.log("************fechou o textoTrailerArquivo arquivo");
    aResolver(textoTrailerArquivo);  
})
.catch(err => {
    aRejeitar("Ocorreu um errro ao tentar montar o HeaderArquivo!" + err);
});       
}); 
//}); 