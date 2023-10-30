//seleção dos elementos (atraves do DOM)
const preverOperacaoTexto = document.querySelector("#prever-resultado") // Visor do cálculo de previsão
const calculando = document.querySelector("#calculando") // Visor do cálculo sendo digitado
const botoes = document.querySelectorAll("#gradeBotao button") // Todos os botões da calculadora


//Lógica da calcularora em JS POO
class Calculado {
    constructor(preverOperacaoTexto, calculando){ //valores de fluxo da operação
        this.preverOperacaoTexto = preverOperacaoTexto //Propriedades do objeto para não trabalhar diretamente com o DOM
        this.calculando = calculando
        this.calcula = "" //Valor que o usuário está digitando
    }

    //adiciona digitos da calculadora
    adicionaDigito(digito){
        //Verifica se o último caractere no visor é um ponto e se já existe um ponto (função da lógica do IF de botoes.foreach)
        if (digito === "." && this.calculando.innerText.includes(".")) {
            return;
        }

        this.calcula = digito; // adiciona o dígito ao visor
        this.atualizaTela()  //Atualiza o visor
    }

    //processa as operações (função da logica do ELSE de botoes.foreach)
    valoresOPeradores(operacao){
        //Checa se o valor no visor é vazio (empty) e a operação não é "C"
        if(calculando.innerText === "" && operacao !== "C"){
            //Mudança de operação
            if(this.preverOperacaoTexto.innerText !== ""){
                this.mudaOperacao(operacao)
            }
            return
        }


        //Pegando os valores atuais e os recorrente
        let valorDaOperacao
        const prever = +this.preverOperacaoTexto.innerText.split(" ")[0] //metodo split(para a string do vetor ser ordenado para uma sustring em um array e retorna array, soma na previsão)
        const recorrente = +this.calculando.innerText //valor passado anterior para valor numerico

        switch(operacao){ //verificando a operação
            case "+":
                valorDaOperacao = prever + recorrente
                this.atualizaTela(valorDaOperacao, operacao, recorrente, prever)
                break
            case "-":
                valorDaOperacao = prever - recorrente
                this.atualizaTela(valorDaOperacao, operacao, recorrente, prever)
                break
            case "/":
                valorDaOperacao = prever / recorrente
                this.atualizaTela(valorDaOperacao, operacao, recorrente, prever)
                break
            case "*":
                valorDaOperacao = prever * recorrente
                this.atualizaTela(valorDaOperacao, operacao, recorrente, prever)
                break
            case "DEL":
                this.processaDel()
                break
            case "CE":
                this.limpaOperacaoRecorrente()
                break
            case "C":
                this.limpaTodaOperacao()
                break
            case "=":
                this.resultadoDaOperacao()
                break
            default: //retorno para operação que não é válida
                return
        }
    }
        

    //muda os valores da na tela
    atualizaTela(
        valorDaOperacao = null, 
        operacao = null, 
        prever = null, 
        recorrente = null
        ){ //metodo para ter acesso ao this.calculando
        console.log(valorDaOperacao, operacao, recorrente, prever)

        if (valorDaOperacao === null) {
            this.calculando.innerText += this.calcula //concatenando os valores
        }else {
            //checar se o valor é zero, se não adiciona o valor recorrente
            if(prever === 0){
                valorDaOperacao = recorrente
            }

            //Jogando o valor da parte debaixo para cima
            this.preverOperacaoTexto.innerText = `${valorDaOperacao} ${operacao}` //aparece o valor em cima
            this.calculando.innerText = "" //limpa o valor debaixo
        }
    }

    //Mudando a operação
    mudaOperacao(operacao){
        const mathOperations = ["*", "/", "+", "-"]
        if (!mathOperations.includes(operacao)) {
            return
        }
        //substitui o ultimo operador
        this.preverOperacaoTexto.innerText = this.preverOperacaoTexto.innerText.slice(0, -1) + operacao
    }

    //Deleta o ultimo dígito
    processaDel() {
        this.calculando.innerText = this.calculando.innerText.slice(0, -1)
    }

    //limpa a operação que esta sendo digitada abaixo
    limpaOperacaoRecorrente(){
        this.calculando.innerText = ""
    }

    //Limpa a operação de cima e a de baixo
    limpaTodaOperacao(){
        this.preverOperacaoTexto.innerText = ""
        this.calculando.innerText = ""
    }

    // Resultado da Operação
    resultadoDaOperacao(){
        const operacao = preverOperacaoTexto.innerText.split(" ")[1]
        this.valoresOPeradores(operacao)
    }
}


const calculadora = new Calculado(preverOperacaoTexto, calculando) //instancia para executar os métoodos de entrada da lógica (if e else)



//Eventos que irão acontecer para a calculadora funcionar, tipo separar numeros de operadores
botoes.forEach((botao /*nome individual de cada botão*/) => {
    botao.addEventListener/*adicionando um evento*/("click", (e) => {
        const value = e.target.innerText //valor do botão clicado
        if (+value /*converte valor em numero*/ >= 0 || value === ".") { //se ele não for numero >= 0  então...
            calculadora.adicionaDigito(value)
        }else { //se ele não tem valor de numero, então é reconhecido como operação
            calculadora.valoresOPeradores(value)
        }
    })
})

