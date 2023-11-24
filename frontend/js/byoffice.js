document.addEventListener("DOMContentLoaded", function () {
  // Definir a opção padrão como selecionada
  document.getElementById('select').selectedIndex = 0;

  // Adicionar um ouvinte de evento ao select
  var select = document.getElementById("select");
  select.addEventListener("change", function (event) {
    var valorSelecionado = event.target.value;
    console.log("Valor selecionado: " + valorSelecionado);

    enviarRequisicao();
  });
});

async function enviarRequisicao() {
  var select = document.getElementById("select");
  var valorSelecionado = select.value;

  // Cria um objeto para enviar no corpo da requisição POST
  var data = {
    cargoId: valorSelecionado
  };

  try {
    const response = await fetch('/byoffice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Erro na requisição');
    }

    const candidateInfo = await response.json();
    displayCandidate(candidateInfo);
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
}


function displayCandidate(candidateInfoArray) {
  // Selecionar a div com ID "candidateInfo"
  const candidateInfoDiv = document.getElementById('candidateInfo');

  // Limpar o conteúdo atual da div
  candidateInfoDiv.innerHTML = '';

  // Iterar sobre cada candidato na array
  candidateInfoArray.forEach((candidateInfo, index) => {
    const cand_name = candidateInfo.cand_nome;
    const cargo_nome = candidateInfo.cargo_nome;
    const cand_votos = candidateInfo.cand_votos;

    // Criar um elemento div para cada candidato
    const candidateDiv = document.createElement('div');

    // Criar elementos p para cada informação
    const nameParagraph = document.createElement('p');
    const cargoParagraph = document.createElement('p');
    const votosParagraph = document.createElement('p');

    // Adicionar as informações aos elementos p
    nameParagraph.textContent = `Nome: ${cand_name}`;
    cargoParagraph.textContent = `Cargo: ${cargo_nome}`;
    votosParagraph.textContent = `Votos: ${cand_votos}`;

    // Adicionar os elementos p à div do candidato
    candidateDiv.appendChild(nameParagraph);
    candidateDiv.appendChild(cargoParagraph);
    candidateDiv.appendChild(votosParagraph);

    // Adicionar a div do candidato à div principal
    candidateInfoDiv.appendChild(candidateDiv);

    // Adicionar uma linha (<hr>) entre candidatos, exceto após o último
    if (index < candidateInfoArray.length - 1) {
      candidateInfoDiv.appendChild(document.createElement('hr'));
    }
  });
}
