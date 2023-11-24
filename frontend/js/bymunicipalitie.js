document.addEventListener("DOMContentLoaded", function () {
  const selectMunicipios = document.getElementById("municipios")
  const candidateInfoDiv = document.getElementById('candidateInfo')
  const container2 = document.getElementById('container2')
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
          throw new Error("Erro ao obter dados do município.")
        }
        return response.json()
      })
      .then(function (dados) {
        displayCandidate(dados, candidateInfoDiv)
        var total = 0
        dados.forEach(function (candidate) {
          total += candidate.cand_votos
        })
        console.log(total)
        appendTotalVotesInfo(total, container2)
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  fetch("/bymunicipalities/list", { method: "POST" })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Erro ao obter municípios.")
      }
      return response.json()
    })
    .then(function (municipalities) {
      municipalities.forEach(function (municipio) {
        const option = document.createElement("option")
        option.value = municipio.id
        option.text = municipio.nome
        selectMunicipios.add(option)
      })
    })
    .catch(function (error) {
      console.error(error)
    })

  selectMunicipios.addEventListener("change", function () {
    const selectedValue = selectMunicipios.value
    console.log("Valor selectedValue:", selectedValue)
    sendRequest(selectedValue)
  })
})

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
  document.addEventListener("DOMContentLoaded", function () {
    const selectMunicipios = document.getElementById("municipios")
    const candidateInfoDiv = document.getElementById('candidateInfo')
    function sendRequest(selectedValue) {
      // Realize uma requisição ao backend com o valor selectedValue
      fetch("/bymunicipalities/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedValue: selectedValue }),
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Erro ao obter dados do município.")
          }
          return response.json()
        })
        .then(function (dados) {
          
          displayCandidate(dados, candidateInfoDiv)
          //console.log("Dados do município selectedValue:", dados)
          var total = 0
          dados.forEach(function(candidate) {
            total += candidate.cand_votos
          })
          console.log(total)
          appendTotalVotesInfo(total, container2)
        })
        .catch(function (error) {
          console.error(error)
        })
    }
    fetch("/bymunicipalities/list", { method: "POST" })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Erro ao obter municípios.")
        }
        return response.json()
      })
      .then(function (municipalities) {
        municipalities.forEach(function (municipio) {
          const option = document.createElement("option")
          option.value = municipio.id
          option.text = municipio.nome
          selectMunicipios.add(option)
        })
      })
      .catch(function (error) {
        console.error(error)
      })   
    selectMunicipios.addEventListener("change", function () {
      const selectedValue = selectMunicipios.value
      console.log("Valor selectedValue:", selectedValue)

      sendRequest(selectedValue)
    })
  })
  
  
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
  const row = document.createElement('tr')

  row.innerHTML = `<td>${cand_name}</td><td>${carg_nome}</td><td>${cand_votos}</td>`

  table.appendChild(row)
}

function appendTotalVotesInfo(votes, container) {
  const all = votes

  const allVotes = document.createElement('h2')
  allVotes.textContent = `Total de Votos por município: ${all}`

  container.innerHTML = ''
  container.appendChild(allVotes)
}
