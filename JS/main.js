const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach( (elemento) => {
    criaElemento(elemento)
});

form.addEventListener("submit",(evento) => {
    evento.preventDefault()
    
    const nome = evento.target.elements["nome"]
    const quantidade =  evento.target.elements["quantidade"]
    //  Const para conferir elemento nome no array itens 
    const existe = itens.find( elemento => elemento.nome === nome.value ) 
    
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    // Condicional para conferir se o elemento 
    if (existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

        criaElemento(itemAtual)

        itens.push(itemAtual)
    }

    localStorage.setItem("itens",JSON.stringify(itens))

    nome.value= ""  
    quantidade.value=""
});

        


function criaElemento(item) {

    /*Aqui vamos criar um Elemento para a LI, e mapeamos em uma variavel */
    const novoItem = document.createElement('li')
    
/*Agora adicionamos uma classe ao item criado */
    novoItem.classList.add('item')

/*Agora criamos o Elemento STRONG e mapeamos na variavel*/
    const numeroItem = document.createElement('strong')
    

    /*Direcionamos o 'numeroItem' para receber a qtd, usamos o IneerHTML pq a variavel é um html (strong) 
 Fazemos assim pq nao quero que a variavel se torne a qtd e sim RECEBA o valor da qtd*/
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id

/* Usamos o appendChild para colocar a quantidade dentro do novoIten (li) criada  */   
    novoItem.appendChild(numeroItem)
    
    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id)) // Referenciar a função botaoDeleta no nó da função principal

    lista.appendChild(novoItem)

 
}
    

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

//Função para criar botão com evento de click nos itens, e retornar os itens clicados
function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}
//Função para deletar os itens enviados da função botaoDeleta no array de itens e no navegador

function deletaElemento(tag, id) { 
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))
}