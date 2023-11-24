document.addEventListener("DOMContentLoaded", function () {

  document.getElementById('select').selectedIndex = 0

  var select = document.getElementById("select")
  select.addEventListener("change", function (event) {
      var selectedValue = event.target.value
      console.log("Valor selecionado: " + selectedValue)

      enviarRequisicao()
  })
})

async function enviarRequisicao() {
  var select = document.getElementById("select")
  var selectedValue = select.value

  var data = {
      cargoId: selectedValue
  }

  try {
      const response = await fetch('/byoffice', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })

      if (!response.ok) {
          throw new Error('Erro na requisição')
      }

      const candidateInfo = await response.json()
      displayCandidate(candidateInfo)
  } catch (error) {
      console.error('Erro na requisição:', error)
  }
}

function displayCandidate(candidateInfoArray) {
  const candidateTable = document.getElementById('candidateTable')

  candidateTable.innerHTML = ''

  const thead = document.createElement('thead')
  const headerRow = document.createElement('tr')
  headerRow.innerHTML = '<th>Nome</th><th>Cargo</th><th>Votos</th><th>Status</th>'
  thead.appendChild(headerRow)
  candidateTable.appendChild(thead)

  const tbody = document.createElement('tbody')

    candidateInfoArray.forEach((candidateInfo) => {
    const cand_name = candidateInfo.cand_nome
    const cargo_nome = candidateInfo.cargo_nome
    const cand_votos = candidateInfo.cand_votos
    let cand_status = candidateInfo.cand_status

    if (cand_status == 1) {
        cand_status = 'Eleito'
    } else {
        cand_status = 'Não Eleito'
    }    

    const row = document.createElement('tr')


      row.innerHTML = `<td>${cand_name}</td><td>${cargo_nome}</td><td>${cand_votos}</td><td>${cand_status}</td>`


      tbody.appendChild(row)
  })

  candidateTable.appendChild(tbody)
}
