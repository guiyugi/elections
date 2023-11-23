(function listCandidate() {
    const candidateInput = document.getElementById('candidateInput')
  
    const xhr = new XMLHttpRequest()
  
    xhr.open('POST', 'http://localhost:3333/candidatos', true)
    xhr.setRequestHeader('Content-Type', 'application/json')
  
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        const candidateList = document.getElementById('candidateList')
        const candidatosData = JSON.parse(xhr.responseText)
  
        candidateList.innerHTML = ''
  
        candidatosData.forEach(candidato => {
          const optionItem = document.createElement('option')
          optionItem.value = candidato.cand_nome
          candidateList.appendChild(optionItem)
        })
      } else {
        console.error('Erro ao buscar candidatos:', xhr.statusText)
      }
    }
  
    xhr.onerror = function () {
      console.error('Erro na requisição.')
    }

    const requestData = JSON.stringify({ nome: candidateInput.value })
    xhr.send(requestData)
  })();
  
  function submitSelection() {
    const candidateInput = document.getElementById('candidateInput')
    const nome = candidateInput.value
  
    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://localhost:3333/candidatos', true)
    xhr.setRequestHeader('Content-Type', 'application/json')
  
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        const candidateInfo = JSON.parse(xhr.responseText)
        displayCandidateInfo(candidateInfo)
      } else {
        console.error('Erro na resposta do servidor')
      }
    }
  
    xhr.onerror = function () {
      console.error('Erro na requisição.')
    }
  
    const requestData = JSON.stringify({ nome: nome })
    xhr.send(requestData)
  
    candidateInput.value = ''
  }
  
  function displayCandidateInfo(candidateInfo) {
    const candidateArray = candidateInfo

    const candidateInfoDiv = document.getElementById('candidateInfo')
    candidateInfoDiv.innerHTML = ''
        candidateArray.forEach(candidato => {
            const paragraphName = document.createElement('p');
            paragraphName.textContent = `Nome: ${candidato.cand_nome || 'N/A'}`
            candidateInfoDiv.appendChild(paragraphName)
    
            const paragraphOffice = document.createElement('p');
            paragraphOffice.textContent = `Cargo: ${candidato.cargo_nome || 'N/A'}`
            candidateInfoDiv.appendChild(paragraphOffice)
    
            const paragraphVotes = document.createElement('p');
            paragraphVotes.textContent = `Votos: ${candidato.cand_votos || 'N/A'}`
            candidateInfoDiv.appendChild(paragraphVotes)
        })}