// Aguarda o HTML carregar totalmente para ativar os botões
document.addEventListener('DOMContentLoaded', () => {
    
    // Ouvinte para a tecla Enter no input de nome
    const inputNome = document.getElementById('nome-entrada');
    if (inputNome) {
        inputNome.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                verificarAcesso();
            }
        });
    }
});

let pontos = 0;
let jogoAtivo = false;

const gostosDela = ['❤️', '🚗', '🏀', '🔴', '⚪', '⚫', '👑'];

const mensagensIrmas = {
    "mikaelly": "Mikaaaa! Você é uma irmã incrível, mas esse site é uma surpresa para a Kemilly. 😉",
    "thaynara": "Thaygataaa! Você mora no meu coração, mas hoje o brilho é da Kemilly! ❤️",
    "lorrayne": "E aí, Lorrayne! Amo você, mas isso aqui é pra pé preto da sua irmã kkkk!",
    "isabelly": "Isaaaa meu nenê! A senha hoje é o nome da sua irmã mais velha! ❤️"
};

function verificarAcesso() {
    const entrada = document.getElementById('nome-entrada');
    const nome = entrada.value.trim().toLowerCase();
    const erro = document.getElementById('erro-login');
    const loginScreen = document.getElementById('login-screen');
    const appPrincipal = document.getElementById('app');
    
    if (nome === "kemilly" || nome === "kemilly vitoria") {
        loginScreen.style.display = 'none';
        appPrincipal.style.display = 'block';
        return;
    }

    if (mensagensIrmas[nome]) {
        erro.innerText = mensagensIrmas[nome];
        erro.style.color = "#ff758f";
    } else {
        erro.innerText = "Hum... acho que esse não é o nome dela! 🤨";
        erro.style.color = "#d63031";
    }
    erro.style.display = 'block';
    entrada.value = "";
}

function iniciarJogo() {
    jogoAtivo = true;
    pontos = 0;
    document.getElementById('score').innerText = pontos;
    document.getElementById('hero').style.display = 'none';
    document.getElementById('game-canvas').style.display = 'block';
    criarElementoGostoDela();
}

function criarElementoGostoDela() {
    if (pontos >= 10 || !jogoAtivo) {
        finalizarJogo();
        return;
    }
    const area = document.getElementById('area-clique');
    area.innerHTML = ''; 
    const elemento = document.createElement('div');
    elemento.innerHTML = gostosDela[Math.floor(Math.random() * gostosDela.length)];
    elemento.className = 'elemento-game';
    elemento.style.position = 'absolute';
    
    // Cálculo de posição para não sair da área
    const larguraMax = area.clientWidth - 60;
    const alturaMax = area.clientHeight - 60;
    const x = Math.max(10, Math.random() * larguraMax);
    const y = Math.max(10, Math.random() * alturaMax);
    
    elemento.style.left = x + 'px';
    elemento.style.top = y + 'px';
    elemento.style.fontSize = '50px';
    elemento.style.cursor = 'pointer';
    elemento.style.userSelect = 'none';

    elemento.onclick = (e) => {
        e.stopPropagation();
        pontos++;
        document.getElementById('score').innerText = pontos;
        if (pontos < 10) {
            setTimeout(criarElementoGostoDela, 50);
        } else {
            finalizarJogo();
        }
    };
    area.appendChild(elemento);
}

function finalizarJogo() {
    jogoAtivo = false;
    document.getElementById('game-canvas').style.display = 'none';
    document.getElementById('mensagem-final').style.display = 'block';
}

function revelarGaleriaSecreta() {
    const container = document.getElementById('galeria-secreta');
    const btn = document.getElementById('btn-secreto');
    
    if (container.style.display === 'none' || container.style.display === '') {
        container.style.display = 'block';
        btn.innerText = "ESCONDER LOGO! 🙈";
    } else {
        container.style.display = 'none';
        btn.innerText = "Abrir Arquivo Secreto 🤫";
    }
}

function abrirFoto(elemento) {
    const modal = document.getElementById('modal-foto');
    const imgModal = document.getElementById('foto-expandida');
    const legendaModal = document.getElementById('legenda-modal');
    
    const srcOriginal = elemento.querySelector('img').src;
    const textoLegenda = elemento.querySelector('.legenda').innerText;

    imgModal.src = srcOriginal;
    legendaModal.innerText = textoLegenda;
    modal.style.display = 'flex';
}

function fecharFoto() {
    document.getElementById('modal-foto').style.display = 'none';
}