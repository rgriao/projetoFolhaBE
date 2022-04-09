const TabelaFolha = require("../models/TabelaFolha");
const { CompletaCampos } = require("../controllers/processamentos");
const { BuscaQdeRegistros, SomaPagamentos } = require("../controllers/processamentos")

exports.AjustaTrailerLote = (corpo) => new Promise 
((aResolver, aRejeitar) => {
//recebe o cnpj para buscar os dados
var espaco9 = "         ";
var espaco10 = "          ";
var espaco15 = "               ";
var espaco30 = "                              ";
var digito6 = "000000";   

var textoTrailerLote = [];
var QdeRegistros = ((BuscaQdeRegistros(corpo)*2)+2).toString();


SomaPagamentos(corpo).then((vrPagamentos) => {
    //console.log("\n\n"+"**********Entrou no AjustaTrailerLote Glória a Deus!"+"\n\n")
    TabelaFolha.findOne({where: {cnpj: corpo[0].cnpj}})
    .then(folha => {    
        //console.log("\n\n"+"***********dentro dos TabelaFolha.findOne *************"+ vrPagamentos + "\n\n");
    textoTrailerLote = [folha.codigodobanco,"0001","5",espaco9,CompletaCampos("inicio",QdeRegistros,6,"0"),
    CompletaCampos("inicio",(vrPagamentos).toString(),18,"0"),digito6+digito6+digito6,digito6,espaco30+espaco30+
    espaco30+espaco30+espaco30+espaco15,espaco10+"\n"]
    })    
    .catch(err => {
        aRejeitar("Ocorreu um errro ao tentar montar o HeaderArquivo!" + err);
    })
    .then(() => {  
        //console.log("***********saiu do textoTrailerLote: *************" + textoTrailerLote);
        aResolver(textoTrailerLote);  
    });
});      
}); 