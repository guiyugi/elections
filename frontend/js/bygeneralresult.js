document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('opcaoTodos').checked = true;

  function searchMatches() {
    const selectedStatus = document.querySelector('input[name="opcaoStatus"]:checked').value;

    fetch('/generalresult', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro ao buscar resultados: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        const filteredResults = data.filter(candidate => {
          if (selectedStatus === 'todos') {
            return true;
          } else if (selectedStatus === 'eleito') {
            return candidate.cand_status === 1;
          } else if (selectedStatus === 'naoeleito') {
            return candidate.cand_status === 0;
          }
        });

        const tableResults = document.getElementById('resultadosGeral');
        tableResults.innerHTML = '';

        const table = document.createElement('table');
        table.classList.add('table', 'tabela-resultados', 'table-responsive'); // Adiciona classes à tabela

        const headerRow = document.createElement('tr');
        headerRow.innerHTML = '<th>Candidato</th><th>Cargo</th><th>Votos</th><th>Status</th>';
        table.appendChild(headerRow);

        filteredResults.forEach(candidate => {
          const row = document.createElement('tr');
          row.innerHTML = `<td>${candidate.cand_nome}</td><td>${candidate.cargo_nome}</td><td>${candidate.cand_votos}</td><td>${candidate.cand_status===1?'Eleito':'Não eleito'}</td>`;
          table.appendChild(row);
        });

        tableResults.appendChild(table);
      })
      .catch(error => console.error(error));
  }

  searchMatches();

  const radioButtons = document.querySelectorAll('input[type=radio][name=opcaoStatus]');
  radioButtons.forEach(button => {
    button.addEventListener('change', function () {
      searchMatches();
    });
  });
});
