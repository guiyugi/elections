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
        displayCandidate(candidateInfo)
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
  function selecterOffice() {
    var select = document.getElementById("select");
    var valorSelecionado = select.options[select.selectedIndex].value;
    console.log("Valor selecionado: " + valorSelecionado);
}
function displayCandidate(candidateInfo) {
  const cand_name = candidateInfo[0].cand_nome
  const carg_nome = candidateInfo[0].cargo_nome
  const cand_votos = candidateInfo[0].cand_votos
  console.log(candidateInfo[0].cand_nome)
  console.log(`teste -> ${cand_name}, ${carg_nome}, ${cand_votos}`)
  //pesquisa por candidato pornto, aqui
}

