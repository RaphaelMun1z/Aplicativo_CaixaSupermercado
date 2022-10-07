var entradaCodBarras = document.querySelector('#entradaCodigo')
var entradaQuant = document.querySelector('#entradaQuantidade')
var imagemProduto = document.querySelector('.imgProduto')
var PrecoFinal = document.querySelector('#totalFinal')
var sectionPag = document.querySelector('.sessaoPagamento')

entradaCodBarras.addEventListener("keyup", digitando)
entradaCodBarras.addEventListener("keypress", onlynumber)
entradaQuant.addEventListener("keyup", digitando)

// Vetores dos produtos

var codigos      = ['7891025101604','7891000105016','7891000120101','7891000100103','7891999000538','7896051126041','7897236904805','7622300830083','7891150036567','4005900036728','7896185989819','7898113811452']
var descricoes   = ['Leite - Italac | 1l','Barra cereal - Nutry | 22g','Creme de leite - Nestle | 300g','Leite condensado - Piracanjuba | 395g','Iogurte - Nestle | 170g','Leite fermentado - Frimesa | 850g','Água - Nestle | 510ml','Biscoito recheado - Nestle | 130g','Caldo de galinha - Kisabor | 1,01kg','Desodorante - Rexona | 150ml','Vitamina C - Equaliv | 500mg','Lanche - Seara | 145g']
var precoVarejo  = [3.80, 1.50, 6.00, 3.60, 2.80, 6.80, 1.60, 2.50, 45.00, 3.99, 78.99, 4.99]
var precoAtacado = [3.50, 1.20, 5.50, 3.45, 2.65, 6.50, 1.40, 2.20, 43.20, 3.70, 78.10, 4.79]
var estoque      = [15,18,28,23,40,11,32,20,12,17,7,16]
var imagem       = ['leite.png', 'barraCereal.png', 'cremeLeite.png', 'leiteCondensado.png', 'iogurte.png', 'leiteFermentado.png', 'agua.png', 'bolacha.png', 'caldoGalinha.png', 'desodorante.png', 'vitaminaC.png', 'lanche.png']
var promocao     = ['Nenhuma','Nenhuma','Nenhuma','Nenhuma','Nenhuma','Nenhuma','Nenhuma','Nenhuma','Nenhuma','Nenhuma','Nenhuma','Nenhuma','Nenhuma']

// Vetores nota fiscal

var descFiscal = []
var precoFiscal = []
var quantFiscal = []
var quantItens = 0
var somaTudo = 0

// Auxiliares

var lerTecla = 1
var atualIndice
var nmrProduto = 1
var produtoValido = false

// Permite apenas números no campo do código de barras

function onlynumber(evt) {
   var theEvent = evt || window.event;
   var key = theEvent.keyCode || theEvent.which;
   key = String.fromCharCode( key );
   //var regex = /^[0-9.,]+$/;
   var regex = /^[0-9.]+$/;
   if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
   }
}

// Quando o usuário estiver digitando no campo de código de barras

function digitando(){

	// Procura produto dentro do vetor de códigos
	var ii = [];
	var elemento = entradaCodBarras.value;

	var indOf = codigos.indexOf(elemento);

	while (indOf != -1) 
	{
	  ii.push(indOf);
	  indOf = codigos.indexOf(elemento, indOf + 1);
	}

	// Manda as informações encontradas para a tabela de informações do produto, na tela

	if(entradaCodBarras.value.length == 13 && ii != ''){
		descProduto.innerHTML = descricoes[ii]
		precoVarejoTable.innerHTML = "R$ " + precoVarejo[ii].toFixed(2)
		precoAtacadoTable.innerHTML = "R$ " + precoAtacado[ii].toFixed(2)
		quantidadeProduto.innerHTML = estoque[ii]
		promocaoProduto.innerHTML = promocao[ii]
		produtoValido = true
	}else
	if(entradaCodBarras.value.length == 13 && ii == ''){
		descProduto.innerHTML = "-| Nenhum produto encontrado |-"
		precoVarejoTable.innerHTML = "-| ? |-"
		precoAtacadoTable.innerHTML = "-| ? |-"
		quantidadeProduto.innerHTML = "-| ? |-"
		promocaoProduto.innerHTML = "-| ? |-"
		produtoValido = false
	}else{
		descProduto.innerHTML = ""
		precoVarejoTable.innerHTML = ""
		precoAtacadoTable.innerHTML = ""
		quantidadeProduto.innerHTML = ""
		promocaoProduto.innerHTML = ""
		produtoValido = false
	}

	atualIndice = ii

	// Imagem do produto

	if(imagem[atualIndice] != null){
		imagemProduto.src = imagem[atualIndice]
	}
	else{
		imagemProduto.src = 'wolfImage.png'
	}

}
 
// Ler tecla 

function keyPressed(evt){
    evt = evt || window.event;
    var key = evt.keyCode || evt.which;
    return String.fromCharCode(key); 
}

document.onkeypress = function(evt) {
    var str = keyPressed(evt);

    switch(str)
    {
    	case 'q':
    		registrar()
    	break
    	case 'w':
    		cancelar()
    	break
    	case 'e':
    		cadastrar()
    	break
    	case 'r':
    		finalizar()
    	break
	}
};

// Registrar produto no carrinho

function registrar(){ 
	if(produtoValido){
		if(entradaQuant.value <= 0 || entradaQuant.value > estoque[atualIndice]){
			alert('Quantidade insuficiente')
		}else{
			descFiscal.push(descricoes[atualIndice])
			quantFiscal.push(entradaQuant.value)
			quantItens++
			if(entradaQuant.value <= 10){
				precoFiscal.push(precoVarejo[atualIndice])
				totalItem = entradaQuant.value * eval(precoVarejo[atualIndice]) 
			}
			else{
				precoFiscal.push(precoAtacado[atualIndice])
				totalItem = entradaQuant.value * eval(precoAtacado[atualIndice]) 
			}
			estoque[atualIndice] -= entradaQuant.value
		
			for(var ii = 0; ii < quantItens; ii++)
			{
				nmrItem.innerHTML = nmrProduto
				descItem.innerHTML = descFiscal[ii]
				quantItem.innerHTML = quantFiscal[ii] + " un."
				precoItem.innerHTML = "R$ " + precoFiscal[ii].toFixed(2)
				ttlItem.innerHTML = "R$ " + totalItem.toFixed(2)
				somaTudo += eval(totalItem)
			}
	
			nmrProduto++
		}

	entradaCodBarras.value = ""
	entradaQuant.value = 1

	}else{
		alert('Código de barras inválido')
	}
}

// Cancelar processo

function cancelar(){
	nmrItem.innerHTML = ""
	descItem.innerHTML = ""
	quantItem.innerHTML = ""
	precoItem.innerHTML = ""
	ttlItem.innerHTML = ""
	quantItens = 1
	nmrProduto = 1
	descFiscal = []
	precoFiscal = []
	quantFiscal = []
	quantItens = 0
	somaTudo = 0.00
	alert('Todos os itens foram retirados')
}

// Cadastrar novo produto

function cadastrar(){
	alert('Opção indisponível')
}

// Finalizar

function finalizar(){
	if(quantItens == 0){
		alert('Nenhum produto selecionado')
	}else{
	alert('---| Carrinho |---')
	alert('---| Produtos |---')
	descFiscal.forEach(imprimirDesc)
	alert('---| Preços por unidade |---')
	precoFiscal.forEach(imprimirPre)
	alert("Quantidade de registros realizados: " + quantItens)
	PrecoFinal.innerHTML = "Total R$ " + somaTudo.toFixed(2)

	function imprimirDesc(elemento){
		alert(elemento)
	}

	function imprimirPre(elemento){
		alert("R$ " + eval(elemento).toFixed(2))
	}

	sectionPag.style.display = 'flex'

	// Forma de pagamento

	window.addEventListener('keypress', mudaValor)

	var forma = 1
	var txtForma = 'ERRO'
	var ccredito = document.querySelector('.cdc') 
	var cdebito = document.querySelector('.cdd') 
	var dinheiro = document.querySelector('.dnr') 

	ccredito.style.backgroundColor = "#596869"

	function keyPressed(btnForma){
	    btnForma = btnForma || window.event;
	    var chaveForma = btnForma.keyCode || btnForma.which;
	    return String.fromCharCode(chaveForma); 
	}

	document.onkeypress = function(btnForma) {
	var mudaForma = keyPressed(btnForma);

		switch(mudaForma)
		{
			case '4':
				forma--
			break
			case '6':
				forma++
			break
			case '5':
				switch(forma){
					case 1:
						txtForma = 'Cartão de crédito'
					break
					case 2:
						txtForma = 'Cartão de débito'
					break
					case 3:
						txtForma = 'Dinheiro'
					break
				}
				alert('Pago com: ' + txtForma + ', obrigado pela preferência, volte sempre!')
				sectionPag.style.display = 'none'
				location.reload()
			break
		}
	}

	function zerarSelecao(){
		ccredito.style.backgroundColor = "transparent"
		cdebito.style.backgroundColor = "transparent"
		dinheiro.style.backgroundColor = "transparent"
	}

	function mudaValor()
	{
			
		if (forma == 1){
			zerarSelecao()
			ccredito.style.backgroundColor = "#596869"
		}
		else 
		if(forma == 2){
			zerarSelecao()
			cdebito.style.backgroundColor = "#596869"
		}
		else
		if(forma == 3){
			zerarSelecao()
			dinheiro.style.backgroundColor = "#596869"
		}
		else
		if(forma > 3){
			zerarSelecao()
			forma = 1
			ccredito.style.backgroundColor = "#596869"
		}
		else
		if(forma < 1){
			zerarSelecao()
			forma = 3
			dinheiro.style.backgroundColor = "#596869"
		}
	}
}
}







