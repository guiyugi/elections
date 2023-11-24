document.addEventListener("DOMContentLoaded", function () {
  const selectMunicipios = document.getElementById("municipios");
  const candidateInfoDiv = document.getElementById('candidateInfo')
  // Função para enviar o valor escolhido para o backend
  function sendRequest(escolhido) {
    // Realize uma requisição ao backend com o valor escolhido
    fetch("/bymunicipalities/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ escolhido: escolhido }),
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Erro ao obter dados do município.")
        }
        return response.json();
      })
      .then(function (dados) {
        
        displayCandidate(dados, candidateInfoDiv)
        //console.log("Dados do município escolhido:", dados)
        var total = 0
        dados.forEach(function(candidate) {
          total += candidate.cand_votos
        })
        console.log(total)
        appendTotalVotesInfo(total, container2)
      })
      .catch(function (error) {
        console.error(error)
      });
  }

  // Carregue os municípios ao carregar a página
  fetch("/bymunicipalities/list", { method: "POST" })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Erro ao obter municípios.");
      }
      return response.json();
    })
    .then(function (municipalities) {
      municipalities.forEach(function (municipio) {
        const option = document.createElement("option")
        option.value = municipio.id
        option.text = municipio.nome
        selectMunicipios.add(option)
      });
    })
    .catch(function (error) {
      console.error(error)
    });

  // Adicione um ouvinte de evento para o evento de mudança do select
  selectMunicipios.addEventListener("change", function () {
    const escolhido = selectMunicipios.value;
    console.log("Valor escolhido:", escolhido);

    // Envie o valor escolhido para o backend
    sendRequest(escolhido)
  });
});


function displayCandidate(candidateInfo, container) {
  // Limpa as informações anteriores
  container.innerHTML = ''

  if (Array.isArray(candidateInfo)) {
    candidateInfo.forEach(candidate => {
      appendCandidateInfo(candidate, container)
    })
    

  } else {
    appendCandidateInfo(candidateInfo, container)
    
  }
}

function appendCandidateInfo(candidate, container) {
  const cand_name = candidate.cand_nome
  const carg_nome = candidate.cargo_nome
  const cand_votos = candidate.cand_votos

  const candidateInfoItem = document.createElement('p')
  candidateInfoItem.textContent = `Candidato: ${cand_name}, Cargo: ${carg_nome}, Votos: ${cand_votos}`

  container.appendChild(candidateInfoItem)
}

function appendTotalVotesInfo(votes, container) {
  const all = votes

  const allVotes = document.createElement('h2')
  allVotes.textContent = `Total de Votos por município: ${all}`

  container.appendChild (allVotes)
}