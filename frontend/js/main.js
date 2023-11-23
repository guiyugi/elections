document.addEventListener('DOMContentLoaded', function () {
  // limpa o candidate list caso o usuario saia da pagina
  window.addEventListener('beforeunload', function () {
    document.getElementById('candidateList').value = ''
  })

  document.getElementById('submitBtn').addEventListener('click', submitSelection)
  listCandidates()
})

async function listCandidates() {
  const candidateList = document.getElementById('candidateList')
  const datalist = document.getElementById('candidateDatalist')

  try {
    const response = await fetch('http://localhost:3333/candidatos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: '' }), // obtem todos candidados
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
      // Atualize a lista de candidatos
      listCandidates()
    } else {
      console.error('Erro na resposta do servidor')
    }
  } catch (error) {
    console.error('Erro na requisição:', error)
  }

  // Limpa a seleção no datalist
  candidateList.value = ''
}

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