var valor = document.getElementById('visor');
var expressao = '';

function adicionaNoVisor(valor) { 

    expressao += valor;
    visor.value = expressao;  
    eliminaOperacaoDuplicada(valor)      
}

function limpaVisor(){
    expressao = '';
    visor.value = '';
}

function calculaResultado(){
    try{
        expressao = eval (expressao);
        visor.value = expressao;
    }catch (erro){
        visor.value = 'ERRO';
        expressao = '';
    }
}

function eliminaOperacaoDuplicada(valor){
    //verificar qual o ultimo digito da string e como tirar ele(visor.value)
    // caso o valor recebido pela função for um operador e o ultimo digito da string tambem remove o ultimo digito da string

}