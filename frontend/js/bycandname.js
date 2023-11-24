document.addEventListener('DOMContentLoaded', function () {
  // limpa o candidate list caso o usuario saia da pagina
  window.addEventListener('beforeunload', function () {
    document.getElementById('candidateList').value = ''
  })

  document.getElementById('submitBtn').addEventListener('click', submitSelection)
  listCandidates()
})

async function listCandidates() {
  const datalist = document.getElementById('candidateDatalist')

  try {
    const response = await fetch('http://localhost:3333/candidatos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: '' }), 
    })

    if (!response.ok) {
      throw new Error(`Erro ao buscar candidatos: ${response.statusText}`)
    }

    const candidatesData = await response.json()

    datalist.innerHTML = ''

    candidatesData.forEach(candidate => {
      const optionItem = document.createElement('option')
      optionItem.value = candidate.cand_nome
      datalist.appendChild(optionItem)
    })
  } catch (error) {
    console.error('Erro na requisição:', error.message)
  }
}

async function submitSelection() {
  const candidateList = document.getElementById('candidateList')
  const candidateInfoDiv = document.getElementById('candidateInfo')
  const name = candidateList.value

  try {
    const response = await fetch('http://localhost:3333/candidatos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    })

    if (response.ok) {
      const candidateInfo = await response.json()
      displayCandidate(candidateInfo, candidateInfoDiv)
      listCandidates()
    } else {
      console.error('Erro na resposta do servidor')
    }
  } catch (error) {
    console.error('Erro na requisição:', error)
  }

  candidateList.value = ''
}

function displayCandidate(candidateInfo, container) {
  container.innerHTML = ''

  const table = document.createElement('table')

  if (Array.isArray(candidateInfo)) {
    const headerRow = document.createElement('tr')
    headerRow.innerHTML = '<th>Candidato</th><th>Cargo</th><th>Votos</th>'
    table.appendChild(headerRow)

    candidateInfo.forEach(candidate => {
      appendCandidateInfoToTable(candidate, table)
    })
  } else {
    appendCandidateInfoToTable(candidateInfo, table)
  }


  container.appendChild(table)
}

function appendCandidateInfoToTable(candidate, table) {
  const cand_name = candidate.cand_nome
  const carg_nome = candidate.cargo_nome
  const cand_votos = candidate.cand_votos

  const row = document.createElement('tr')

  row.innerHTML = `<td>${cand_name}</td><td>${carg_nome}</td><td>${cand_votos}</td>`

  table.appendChild(row)
}
