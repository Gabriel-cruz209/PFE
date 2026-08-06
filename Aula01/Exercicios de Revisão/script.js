const grid = document.getElementById("gridSensores");
const filtro = document.getElementById("filtro");
const botao = document.getElementById("btnAtualizar");
const horaAtualizacao = document.getElementById("horaAtualizacao");

const sensores = [
  {
    id: 1,
    nome: "Sensor Galpão A",
    tipo: "Temperatura",
    valor: 24.5,
    unidade: "°C",
    status: "normal",
    historico: [],
  },
  {
    id: 2,
    nome: "Sensor Estufa",
    tipo: "Umidade",
    valor: 88,
    unidade: "%",
    status: "critico",
    historico: [],
  },
  {
    id: 3,
    nome: "Sensor Compressor",
    tipo: "Pressão",
    valor: 6.2,
    unidade: "bar",
    status: "normal",
    historico: [],
  },
  {
    id: 4,
    nome: "Sensor Câmara Fria",
    tipo: "Temperatura",
    valor: -2,
    unidade: "°C",
    status: "normal",
    historico: [],
  },
  {
    id: 5,
    nome: "Sensor Almoxarifado",
    tipo: "Umidade",
    valor: 45,
    unidade: "%",
    status: "normal",
    historico: [],
  },
  {
    id: 6,
    nome: "Sensor Caldeira",
    tipo: "Temperatura",
    valor: 98,
    unidade: "°C",
    status: "critico",
    historico: [],
  },
];

function formatarValor(sensor) {
  return Number.isInteger(sensor.valor)
    ? sensor.valor
    : sensor.valor.toFixed(1);
}

function renderizarDashboard(lista) {
  grid.innerHTML = "";
  if (!lista.length) {
    grid.innerHTML =
      '<p class="sem-resultados">Nenhum sensor encontrado para este filtro.</p>';
    return;
  }

  lista.forEach((sensor) => {
    const card = document.createElement("article");
    card.className = `card ${sensor.status === "critico" ? "card-alerta" : ""}`;
    card.innerHTML = `
      <div class="card-cabecalho">
        <h2>${sensor.nome}</h2>
        <span class="badge ${sensor.status}">${sensor.status === "critico" ? "Crítico" : "Normal"}</span>
      </div>
      <p class="tipo">${sensor.tipo}</p>
      <p class="valor">${formatarValor(sensor)} <span>${sensor.unidade}</span></p>
      <button type="button" class="btn-historico" data-id="${sensor.id}">Ver histórico</button>`;
    grid.appendChild(card);
  });
}

function atualizarHora() {
  horaAtualizacao.textContent = new Date().toLocaleTimeString("pt-BR");
}

function aplicarFiltro() {
  const lista =
    filtro.value === "Todos"
      ? sensores
      : sensores.filter((sensor) => sensor.tipo === filtro.value);
  renderizarDashboard(lista);
}

function atualizarSensores() {
  sensores.forEach((sensor) => {
    sensor.valor = Number((sensor.valor + Math.random() * 4 - 2).toFixed(1));

    sensor.historico.push({
      valor: sensor.valor,
      horario: new Date().toLocaleTimeString("pt-BR"),
    });

    // Mantém apenas os últimos 10 registros
    if (sensor.historico.length > 10) {
      sensor.historico.shift();
    }
  });

  aplicarFiltro();
  atualizarHora();
}

filtro.addEventListener("change", aplicarFiltro);
botao.addEventListener("click", atualizarSensores);
grid.addEventListener("click", (evento) => {
  if (!evento.target.matches(".btn-historico")) return;
  const sensor = sensores.find(
    (item) => item.id === Number(evento.target.dataset.id),
  );
  const historico = sensor.historico.length
    ? sensor.historico
        .map((item) => `${item.horario} - ${item.valor} ${sensor.unidade}`)
        .reverse()
        .join("\n")
    : "Nenhuma leitura registrada.";

  abrirModal(
    `${sensor.nome}

Leitura atual: ${formatarValor(sensor)} ${sensor.unidade}

Últimas leituras:
${historico}`,
  );
});

aplicarFiltro();
atualizarHora();

const modal = document.getElementById("modal");
const textoModal = document.getElementById("textoModal");
const fecharModal = document.getElementById("fecharModal");

function abrirModal(mensagem) {
  textoModal.textContent = mensagem;
  modal.style.display = "flex";
}

function fechar() {
  modal.style.display = "none";
}

fecharModal.addEventListener("click", fechar);

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    fechar();
  }
});
