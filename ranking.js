const endpoint = "https://sheetdb.io/api/v1/6hjmqksmlsype";
const rankingDiv = document.getElementById("ranking");

const equipes = [
  "Tráfego Pago",
  "Allp Fit",
  "SEO",
  "Podcast",
  "Social Media",
  "Designers",
  "Adm",
  "W3V"
];

async function carregarRanking() {
  try {
    const resposta = await fetch(endpoint);
    const dados = await resposta.json();

    // Contar votos por equipe
    const contagem = {};
    equipes.forEach(equipe => contagem[equipe] = 0);

    dados.forEach(voto => {
      const equipe = voto.voto;
      if (contagem[equipe] !== undefined) {
        contagem[equipe]++;
      }
    });

    const totalVotos = Object.values(contagem).reduce((a, b) => a + b, 0);

    // Converter para array e ordenar por votos
    const rankingOrdenado = Object.entries(contagem).sort((a, b) => b[1] - a[1]);

    rankingDiv.innerHTML = ""; // limpa antes de renderizar

    rankingOrdenado.forEach(([equipe, votos]) => {
      const porcentagem = totalVotos ? Math.round((votos / totalVotos) * 100) : 0;

      const divEquipe = document.createElement("div");
      divEquipe.classList.add("equipe");

      divEquipe.innerHTML = `
        <div class="equipe-name">${equipe} - ${votos} voto(s)</div>
        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${porcentagem}%">${porcentagem}%</div>
        </div>
      `;

      rankingDiv.appendChild(divEquipe);
    });

  } catch (erro) {
    rankingDiv.innerHTML = "<p>Erro ao carregar ranking. Tente novamente.</p>";
  }
}

// Carrega imediatamente
carregarRanking();

// Atualiza a cada 10 segundos
setInterval(carregarRanking, 10000); 
