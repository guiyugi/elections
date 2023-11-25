document.addEventListener("DOMContentLoaded", function () {
  const selectMunicipios = document.getElementById("municipios");
  const candidateInfoDiv = document.getElementById("candidateInfo");
  const container2 = document.getElementById("container2");

  // Limpa o select antes de adicionar as opções ordenadas
  selectMunicipios.innerHTML = "";

  // Adiciona a opção padrão "Selecione..."
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.text = "Selecione...";
  selectMunicipios.add(defaultOption);

  selectMunicipios.addEventListener("change", function () {
    const selectedValue = selectMunicipios.value;
    console.log("Valor selectedValue:", selectedValue);
    sendRequest(selectedValue);
  });

  function sendRequest(selectedValue) {
    fetch("/bymunicipalities/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectedValue: selectedValue }),
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Erro ao obter dados do município.");
        }
        return response.json();
      })
      .then(function (dados) {
        displayCandidate(dados, candidateInfoDiv);
        var total = 0;
        dados.forEach(function (candidate) {
          total += candidate.cand_votos;
        });
        console.log(total);
        appendTotalVotesInfo(total, container2);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  fetch("/bymunicipalities/list", { method: "POST" })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Erro ao obter municípios.");
      }
      return response.json();
    })
    .then(function (municipalities) {
      // Ordena os municípios pelo nome
      municipalities.sort(function (a, b) {
        return a.nome.localeCompare(b.nome);
      });

      municipalities.forEach(function (municipio) {
        const option = document.createElement("option");
        option.value = municipio.id;
        option.text = municipio.nome;
        selectMunicipios.add(option);
      });
    })
    .catch(function (error) {
      console.error(error);
    });
});


function displayCandidate(candidateInfo, container) {
  // Limpa as informações anteriores
  container.innerHTML = '';

  if (Array.isArray(candidateInfo)) {
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>Candidato</th><th>Cargo</th><th>Votos</th><th>Status</th>';
    table.appendChild(headerRow);

    candidateInfo.forEach(candidate => {
      appendCandidateInfoToTable(candidate, table);
    });

    container.appendChild(table);
  } else {
    appendCandidateInfoToTable(candidateInfo, container);
  }
}

function appendCandidateInfoToTable(candidate, table) {
  const cand_name = candidate.cand_nome;
  const carg_nome = candidate.cargo_nome;
  const cand_votos = candidate.cand_votos;
  let cand_status = undefined;

  if (candidate.cand_status == 1) {
    cand_status = 'eleito';
  } else {
    cand_status = 'não eleito';
  }

  const row = document.createElement('tr');
  row.innerHTML = `<td>${cand_name}</td><td>${carg_nome}</td><td>${cand_votos}</td><td>${cand_status}</td>`;
  table.appendChild(row);
}

function appendTotalVotesInfo(votes, container) {
  const all = votes;

  const allVotes = document.createElement('h2');
  allVotes.textContent = `Total de Votos por município: ${all}`;

  container.innerHTML = '';
  container.appendChild(allVotes);
}
