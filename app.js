let amigos = [];

const inputAmigo = document.getElementById("amigo");
const listaAmigos = document.getElementById("listaAmigos");
const resultado = document.getElementById("resultado");

function limparNome() {
    inputAmigo.value = "";
    inputAmigo.focus();
}

window.adicionarAmigo = function () {
    let nomeDoAmigo = inputAmigo.value.trim();

    if (nomeDoAmigo === "") {
        alert("Por favor, insira um nome.");
        return;
    }

    if (amigos.includes(nomeDoAmigo)) {
        alert("Este nome já está incluído.");
        return;
    }

    amigos.push(nomeDoAmigo);
    limparNome();
    atualizarLista();
    console.log("Nome Incluído:", nomeDoAmigo);
};

function atualizarLista() {
    listaAmigos.innerHTML = "";
    amigos.forEach((amigo, index) => {
        let itemLista = document.createElement("li");
        itemLista.textContent = amigo;

        let botaoRemover = document.createElement("button");
        botaoRemover.textContent = "REMOVER";
        botaoRemover.classList.add("button-remove");
        botaoRemover.onclick = () => removerAmigo(index);

        itemLista.appendChild(botaoRemover);
        listaAmigos.appendChild(itemLista);
    });
}

function removerAmigo(index) {
    amigos.splice(index, 1);
    atualizarLista();
}

window.sortearAmigo = function () {
    if (amigos.length < 2) {
        alert("Você necessita de mais amigos para o sorteio!");
        return;
    }

    let sorteio = [...amigos];
    let resultadoSorteio = [];

    for (let i = 0; i < amigos.length; i++) {
        let amigo = amigos[i];
        let possiveisSorteados = sorteio.filter(nome => nome !== amigo);

        if (possiveisSorteados.length === 0) {
            alert("Sorteio inválido! Tente novamente.");
            return;
        }

        let sorteado = possiveisSorteados[Math.floor(Math.random() * possiveisSorteados.length)];
        resultadoSorteio.push(`${amigo} - ${sorteado}`);
        sorteio.splice(sorteio.indexOf(sorteado), 1);
    }

    exibirResultado(resultadoSorteio);
};

function exibirResultado(listaSorteio) {
    resultado.innerHTML = "";
    listaSorteio.forEach((par) => {
        let itemResultado = document.createElement("li");
        itemResultado.textContent = par;
        resultado.appendChild(itemResultado);
    });
}

window.sortearUmAmigo = function () {
    if (amigos.length === 0) {
        alert("Adicione pelo menos um amigo antes de sortear!");
        return;
    }

    let indiceSorteado = Math.floor(Math.random() * amigos.length);
    let amigoSorteado = amigos[indiceSorteado];

    resultado.innerHTML = `<li>O amigo sorteado é: <strong>${amigoSorteado}</strong></li>`;
};

window.reiniciarJogo = function () {
    amigos = [];
    listaAmigos.innerHTML = "";
    resultado.innerHTML = "";
    inputAmigo.value = "";
    console.log("Jogo reiniciado!");
};
