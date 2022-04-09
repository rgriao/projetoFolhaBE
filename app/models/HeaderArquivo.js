const TabelaFolha = require("../models/TabelaFolha");
const { GeraData, GeraHora, CompletaCampos } = require("../controllers/processamentos");

exports.AjustaHeaderArquivo = (cnpj) => new Promise 
((aResolver, aRejeitar) => {
//recebe o cnpj para buscar os dados
var espaco9 = "         ";
var espaco10 = "          ";
var espaco20 = "                    ";
var espaco29 = "                             ";
var digito1 = "0";    
var digito3 = "000";   
console.log("🔥🔥🔥************ Entrou no AjustaHeaderArquivo:******************* 🔥🔥🔥")
var textoHeaderArquivo = [];
//mudar o cód cnpj para "2" e criar um textoHeaderArquivo e Lote para o BB
//pois o nº do convênio se desdobra em 4 partes de BB1 a BB4 
//(ver outras peculiaridades do BB)
    TabelaFolha.findOne({ where: { cnpj: cnpj } })
        .then(folha => {
            console.log("🔥🔥🔥************ Entrou no AjustaHeaderArquivo - TabelaFolha.findOne:******************* 🔥🔥🔥")
            //com base no cnpj pesquisa os dados //folha.codigodobanco
            textoHeaderArquivo = [folha.codigodobanco,digito1+digito3,digito1,espaco9,
            "1",CompletaCampos("inicio",folha.cnpj,14,"0"),CompletaCampos("inicio",folha.codigoconvenio,20,"0"),
            CompletaCampos("inicio",folha.agenciaempresa,5,"0"),folha.digitodaagenciaempresa,
            CompletaCampos("inicio",folha.ndacontaempresa,12,"0"),folha.digitodacontaempresa,
            CompletaCampos("fim",folha.digitoverificadoragcontaempresa,1," "),CompletaCampos("fim",folha.nomedaempresa,30," "),
            CompletaCampos("fim",folha.nomedobanco,30," "), espaco10,"1",GeraData(),GeraHora(),"000001",
            "103","01600",espaco20,espaco20,espaco29+"\n"];
        })       
        .then(() => {  
            aResolver(textoHeaderArquivo);  
        })
.catch(err => {
    aRejeitar = ("Ocorreu um errro ao tentar montar o HeaderArquivo!" + err);
});       
}); 