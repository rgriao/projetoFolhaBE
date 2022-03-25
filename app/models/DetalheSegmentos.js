const db = require("./index");
const DadosFolha = db.dadosfolhas;
const { CompletaCampos } = require("../controllers/processamentos");

exports.AjustaSegmentos = (corpo) => new Promise 
((aResolver, aRejeitar) => {
    //recebe o cnpj para buscar os dados
    var espaco1 = " ";
    var espaco5 = "     ";    
    var espaco8 = "        ";
    var espaco10 = "          ";
    var espaco20 = "                    "; 
    var digito1 = "0";
    var digito6 = "000000";
    var digito8 = "00000000";
    var digito15 = "000000000000000";      
    var TxtSegmentos = [];
    var textoSegmentoA = [];    
    //var textoSegmentoB = [];

    var qdeRegistro = Object.keys(corpo).length;
    var y = 1;
    const x = new Promise(resolve => (y+1));    
    //console.log("\n\n" + "***********Entrou no segmentoA:*************" + qdeRegistro+"\n\n");
    
    for (let i = 0, p = Promise.resolve(); i < qdeRegistro; i++) {            
            p = p.then(() => DadosFolha.findOne({where: {nomedofuncionario: corpo[i].nomedofuncionario}})) 
            .then((folha) => {   
            textoSegmentoA = [folha.codigodobanco,"0001","3",CompletaCampos("inicio",(1+y).toString(),5,"0"),"A",digito1,digito1+digito1,
            digito1+digito1+digito1,folha.codigodobanco,CompletaCampos("inicio",folha.agenciafuncionario,5,"0"),
            folha.digitodaagenciafuncionario,CompletaCampos("inicio",folha.ndacontafuncionario,12,"0"),
            folha.digitodacontafuncionario,CompletaCampos("fim",folha.digitoverificadoragcontafuncionario,1," "),
            CompletaCampos("fim",folha.nomedofuncionario,30," "),espaco20,folha.datadopagamento,
            "BRL",digito15,CompletaCampos("inicio",folha.valordopagamento,15,"0"),espaco20,
            espaco8,espaco10+espaco5,espaco20+espaco20,"06",
            espaco5,espaco1+espaco1,espaco1+espaco1+espaco1,espaco1,espaco10+"\n",           
            folha.codigodobanco,"0001","3",CompletaCampos("inicio",(2+y).toString(),5,"0"),
            "B",espaco1+espaco1+espaco1,
            "1",CompletaCampos("inicio",folha.cpfdofuncionario,14,"0"),CompletaCampos("fim",folha.enderecofuncionario,35," "),
            CompletaCampos("inicio",folha.ndolocalfuncionario,5,"0"),CompletaCampos("fim",folha.complementofuncionario,15," "),
            CompletaCampos("fim",folha.bairrofuncionario,15," "),CompletaCampos("fim",folha.cidadefuncionario,15," "),
            CompletaCampos("inicio",folha.cepfuncionario,5,"0"),CompletaCampos("fim",folha.complementodocepfuncionario,3," "),
            folha.sigladoestadofuncionario,espaco20+espaco20+espaco20+espaco20+espaco10+
            espaco8+espaco1,digito6,digito8+"\n"            
            ]
            y = y + 2;
             })
             .then(() => {                      
                TxtSegmentos.push(textoSegmentoA);//TxtSegmentos
                //console.log("***********Entrou no PUSH:*************" + TxtSegmentos);
            })
            .then(() => { 
                if (i === qdeRegistro - 1){  
                    //console.log("***********Entrou no aResolver:*************" + TxtSegmentos);
                aResolver(TxtSegmentos);                            
            }
            })
            .catch(err => {
                aRejeitar({mensagem: "Ocorreu um errro ao tentar montar o setor AjustaSegmentoA!" + err});                
            }); 
        }   
});