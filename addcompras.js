//POR ALGUM MOTIVO QUE NAO SEI O PQ, MAS MEU ARQUIVO ADDCOMPRAS NAO ESTA CARREGANDO DE MANEIRA CORRETA
//1. IREI VERIFICAR O CAMINHO ADDCOMPRAS.JS PARA VER SE ELE ESTAR CORRETO
//2. DEPOIS TASTAR PARA VER SE ELE ESTAR CARREGANDO
//3. CERTIFICA SE OS EVENTOS "DRAGSTART" E "DROP" ESTAO FUNCIONANDO


let carrinho =[];
let total = 0;

function alternarModo(){
    document.body.classList.toggle("dark-mode");

    let modoAtivo = document.body.classList.contains("dark-mode");
    localStorage.setItem("modo-dark", modoAtivo);
}

window.onload = function() {
    if (localStorage.getItem("modo-dark") === "true") {
        document.body.classList.add("dark-mode")
    }
};

function filtrarProdutos() {
    let termo = document.getElementById("pesquisa").ariaValueMax.toLowerCase();
    let produtos = document.querySelectorAll(".produto");

    produtos.forEach(produto => {
        let nome = produto.querySelector("h3").textContent.toLowerCase();
        produto.style.display = nome.includes(termo) ? "block" : "none";
    });
}

//FUNCAO ADICIONAR ALGO NO CARRINHO
function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    total += preco;
    atualizarCarrinho();
}

//FUNCAO REMOVER ALGO DO CARRINHO
function removerDoCarrinho(index) {
    if (index > -1) {
        total -= carrinho[index].preco;
        carrinho.splice(index, 1);
        atualizarCarrinho();        
    }
}
//FUNCAO CONFIRMAR A COMPRA
function confirmarCompra(){
    alert("Compra confirmada! Voce sera redirecionado para a pagina de confirmacao ")
    window.location.href = "confirmacao.html";
}
//FUNCAO PARA ATUALIZAR
function atualizarCarrinho(){
    const listaCarrinho = document.getElementById("lista-carrinho");
    const totalElemento = document.getElementById("total");

    listaCarrinho.innerHTML = "";

    carrinho.forEach((item, index) => {
        let li = document.createElement("li");
        li.textContent = `${item.nome} - R$${item.preco.toFixed(2)}`;

        //botao para remover item
        let botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.setAttribute("data-index", index);
        botaoRemover.onclick = function() {
            removerDoCarrinho(index);
        };

        li.appendChild(botaoRemover);
        listaCarrinho.appendChild(li);
    });

    totalElemento.textContent = `R$${total.toFixed(2)}`;
}

//FUNCAO ARRASTAR
function iniciarArraste(event) {
    let produto = event.target.closest(".produto"); // Para garanti que estar pegando o elemento certo

    if (produto) {
        let nome = produto.querySelector("h3").textContent;
        let preco = produto.querySelector("p").textContent.replace("R$", "").trim();

        event.dataTransfer.setData("text", JSON.stringify({ nome, preco }));
    }
}

function permitirSoltar(event) {
    event.preventDefault();
}

window.soltarNoCarrinho = function(event) {
    event.preventDefault();

    let produtoData = event.dataTransfer.getData("text");

    if (produtoData) {
        try{
            let produto = JSON.parse(produtoData);
            console.log("produto solto:", produto);

            //verifica se os dados foram capturados corrtamente
            if (produto.nome && produto.preco) {
                adicionarAoCarrinho(produto.nome, parseFloat(produto.preco));
            } else {
                console.error("Erro ao recuperarproduto: ", produto);
            }
        } catch (error){
            console.error("Erro ao processar dados do produto:", error);
        }    
    }
};

document.addEventListener("DOMContentLoaded", function(){
    setTimeout(() => {
        document.getElementById("tela-boas-vindas").classList.add("ocultar");
        console.log("Transicao concluida! Tela oculta. ");
    }, 2000);
});

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function carregarCarrinho(){
    let dados = localStorage.getItem("carrinho");
    if (dados) {
        carrinho = JSON.parse(dados);
        atualizarCarrinho();
    }
}

window.onload = carregarCarrinho;

// Criando a funcao para slider
let slideIndex = 0;

function mudarSlide(direcao) {
    let slides = document.querySelector(".slides");
    let produtos = document.querySelectorAll(".produto");
    let totalSlides = produtos.length;

     if ((slideIndex + direcao) >= totalSlides || (slideIndex + direcao) < 0) {
        return;
    }

    slideIndex += direcao;
    let deslocamento = -slideIndex * (produtos[0].offsetWidth + 20); // Tamanho do produto + espaçamento

    slides.style.transform = `translateX(${deslocamento}px)`;
}
    
