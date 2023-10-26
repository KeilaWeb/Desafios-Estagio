var valor = document.getElementById('visor');
var expressao = '';

var clique = document.getElementById('botao')
clique.addEventListener('click', clicar)


function adicionaNoVisor(valor) {       
    expressao += valor;
    visor.value = expressao;        
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

function clicar(){
    clique.style.color = 'red'
}

