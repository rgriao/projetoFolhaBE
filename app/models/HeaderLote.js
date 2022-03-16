const db = require("../models");
const DadosFolha = db.dadosfolhas;
const { CompletaCampos } = require("../controllers/processamentos");

exports.AjustaHeaderLote = (cnpj) => new Promise 
((aResolver, aRejeitar) => {
    //recebe o cnpj para buscar os dados
var espaco1 = " ";
var espaco6 = "      ";
var espaco10 = "          ";
var espaco20 = "                    ";
var digito2 = "00";  
//folha.codigodobanco
var camposHeaderLote = [];
    //console.log("********************************Entrou no Headerlote com cnpj: " + cnpj + "- Glória a Deus!")  
    DadosFolha.findOne({where: {cnpj: cnpj}})
    .then(folha => {              
    camposHeaderLote = [folha.codigodobanco,"0001","1","C","30","01","046",
    espaco1,"2",CompletaCampos("inicio",folha.cnpj,14,"0"),CompletaCampos("inicio",folha.codigoconvenio,20,"0"),
    CompletaCampos("inicio",folha.agenciaempresa,5,"0"),folha.digitodaagenciaempresa,
    CompletaCampos("inicio",folha.ndacontaempresa,12,"0"),folha.digitodacontaempresa,
    CompletaCampos("inicio",folha.digitoverificadoragcontaempresa,1," "),CompletaCampos("fim",folha.nomedaempresa,30," "),
    espaco20+espaco20,CompletaCampos("fim",folha.enderecoempresa,30," "),CompletaCampos("inicio",folha.ndolocalempresa,5,"0"),
    CompletaCampos("fim",folha.complementoempresa,15," "),CompletaCampos("fim",folha.cidadeempresa, 20," "),
    CompletaCampos("inicio",folha.cepempresa,5,"0"),CompletaCampos("inicio",folha.complementodocepempresa,3,"0"),
    folha.sigladoestadoempresa,digito2,espaco6,espaco10+"\n"
    ]    
    })
    .then(() => {  
    aResolver(camposHeaderLote);
    })
    .catch(err => {
        var Rejeitou = ({mensagem: "Ocorreu um errro ao tentar montar o HeaderArquivo!" + err});
        aRejeitar(Rejeitou);
    });        
});