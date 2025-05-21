//POR ALGUM MOTIVO QUE NAO SEI O PQ, MAS MEU ARQUIVO ADDCOMPRAS NAO ESTA CARREGANDO DE MANEIRA CORRETA
//1. IREI VERIFICAR O CAMINHO ADDCOMPRAS.JS PARA VER SE ELE ESTAR CORRETO
//2. DEPOIS TASTAR PARA VER SE ELE ESTAR CARREGANDO
//3. CERTIFICA SE OS EVENTOS "DRAGSTART" E "DROP" ESTAO FUNCIONANDO


let carrinho =[];
let total = 0;
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

function soltarDoCarrinho(event) {
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