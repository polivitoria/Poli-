
const perguntas = [
  {
    pergunta: "Quanto é 8 × 7?",
    alternativas: ["54", "56", "64", "48"],
    correta: 1
  },
  {
    pergunta: "Qual é o planeta conhecido como Planeta Vermelho?",
    alternativas: ["Vênus", "Júpiter", "Marte", "Saturno"],
    correta: 2
  },
  {
    pergunta: "Qual é o resultado de 100 ÷ 4?",
    alternativas: ["20", "25", "40", "50"],
    correta: 1
  },
  {
    pergunta: "Qual é o maior órgão do corpo humano?",
    alternativas: ["Coração", "Pulmão", "Cérebro", "Pele"],
    correta: 3
  },
  {
    pergunta: "Quantos lados tem um hexágono?",
    alternativas: ["5", "6", "7", "8"],
    correta: 1
  },
  {
    pergunta: "Qual é o satélite natural da Terra?",
    alternativas: ["Sol", "Lua", "Marte", "Vênus"],
    correta: 1
  },
  {
    pergunta: "Qual é o antônimo de 'alegre'?",
    alternativas: ["Feliz", "Animado", "Triste", "Contente"],
    correta: 2
  },
  {
    pergunta: "Qual é o resultado de 15 + 27?",
    alternativas: ["32", "40", "42", "45"],
    correta: 2
  },
  {
    pergunta: "Em qual continente fica o Brasil?",
    alternativas: ["Europa", "África", "Ásia", "América do Sul"],
    correta: 3
  },
  {
    pergunta: "Qual é a principal estrela do nosso sistema solar?",
    alternativas: ["Lua", "Sol", "Sirius", "Polar"],
    correta: 1
  }
];

const telaInicial = document.getElementById("tela-inicial");
const telaJogo = document.getElementById("tela-jogo");
const telaFinal = document.getElementById("tela-final");

const btnIniciar = document.getElementById("btn-iniciar");
const btnProxima = document.getElementById("btn-proxima");
const btnReiniciar = document.getElementById("btn-reiniciar");

const elementoPergunta = document.getElementById("pergunta");
const elementoAlternativas = document.getElementById("alternativas");
const elementoFeedback = document.getElementById("feedback");
const elementoProgresso = document.getElementById("progresso");
const elementoPontuacao = document.getElementById("pontuacao");
const elementoBarra = document.getElementById("barra");

let indiceAtual = 0;
let pontos = 0;
let respondida = false;

function iniciarJogo() {
  indiceAtual = 0;
  pontos = 0;
  respondida = false;

  telaInicial.classList.add("escondido");
  telaFinal.classList.add("escondido");
  telaJogo.classList.remove("escondido");

  mostrarPergunta();
}

function mostrarPergunta() {
  respondida = false;

  const atual = perguntas[indiceAtual];

  elementoPergunta.textContent = atual.pergunta;
  elementoProgresso.textContent =
    `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;

  elementoPontuacao.textContent = `⭐ Pontos: ${pontos}`;

  elementoBarra.style.width =
    `${(indiceAtual / perguntas.length) * 100}%`;

  elementoFeedback.textContent = "";
  elementoFeedback.className = "feedback";
  btnProxima.classList.add("escondido");

  elementoAlternativas.replaceChildren();

  atual.alternativas.forEach((alternativa, indice) => {
    const botao = document.createElement("button");

    botao.type = "button";
    botao.className = "alternativa";
    botao.textContent = alternativa;

    botao.addEventListener("click", () => {
      verificarResposta(indice, botao);
    });

    elementoAlternativas.appendChild(botao);
  });
}

function verificarResposta(indiceEscolhido, botaoEscolhido) {
  if (respondida) return;

  respondida = true;

  const atual = perguntas[indiceAtual];
  const botoes = elementoAlternativas.querySelectorAll("button");
  const acertou = indiceEscolhido === atual.correta;

  botoes.forEach((botao, indice) => {
    botao.disabled = true;

    if (indice === atual.correta) {
      botao.classList.add("correta");
    }
  });

  if (acertou) {
    pontos += 10;

    elementoFeedback.textContent =
      "🎉 Muito bem! Você acertou! +10 pontos";

    elementoFeedback.classList.add("acerto");
  } else {
    botaoEscolhido.classList.add("errada");

    elementoFeedback.textContent =
      `😊 Quase! A resposta correta é: ${atual.alternativas[atual.correta]}.`;

    elementoFeedback.classList.add("erro");
  }

  elementoPontuacao.textContent = `⭐ Pontos: ${pontos}`;

  elementoBarra.style.width =
    `${((indiceAtual + 1) / perguntas.length) * 100}%`;

  btnProxima.textContent =
    indiceAtual === perguntas.length - 1
      ? "Ver resultado 🏆"
      : "Próxima pergunta ➜";

  btnProxima.classList.remove("escondido");
}

function proximaPergunta() {
  if (!respondida) return;

  indiceAtual++;

  if (indiceAtual < perguntas.length) {
    mostrarPergunta();
  } else {
    finalizarJogo();
  }
}

function finalizarJogo() {
  telaJogo.classList.add("escondido");
  telaFinal.classList.remove("escondido");

  const total = perguntas.length * 10;
  const percentual = (pontos / total) * 100;

  let titulo;
  let mensagem;
  let emoji;

  if (percentual === 100) {
    titulo = "Incrível! Você é um campeão! 🏆";
    mensagem = "Você acertou todas as perguntas. Parabéns!";
    emoji = "🥇";
  } else if (percentual >= 70) {
    titulo = "Muito bem! 🌟";
    mensagem = "Você mandou muito bem. Continue aprendendo!";
    emoji = "🎉";
  } else if (percentual >= 40) {
    titulo = "Bom trabalho! 💪";
    mensagem = "Você está progredindo. Tente novamente!";
    emoji = "👏";
  } else {
    titulo = "Não desista! 📚";
    mensagem = "Cada tentativa é uma oportunidade de aprender.";
    emoji = "💡";
  }

  document.getElementById("titulo-final").textContent = titulo;
  document.getElementById("mensagem-final").textContent = mensagem;
  document.getElementById("emoji-final").textContent = emoji;

  document.getElementById("resultado-final").textContent =
    `Você fez ${pontos} de ${total} pontos e acertou ${pontos / 10} de ${perguntas.length} perguntas!`;
}

btnIniciar.addEventListener("click", iniciarJogo);
btnProxima.addEventListener("click", proximaPergunta);
btnReiniciar.addEventListener("click", iniciarJogo);

