
const database = require('./database.js')

function searchInDatabase(candidate, response) {
    const sqlForCandidate = 'SELECT cand_nome, cargo_nome, cand_votos from votos_cand_estado where cand_nome like ?'

    database.db.all(sqlForCandidate,`%${candidate}%` ,(err, rows) => {
      if (err) {
        throw err
      }
    
      const candidates = JSON.stringify(rows)
      console.log(`lista -> ${candidates}`)
      response.send(candidates)
    })
  }

  function searchByCandidate(request, response) {
      searchInDatabase(request.body.nome, response)
  }

  function searchByOffice(request, response) {
  const { cargo } = request.body
  const sqlForOffice = 'SELECT cand_nome, cargo_nome, cand_votos from votos_cand_estado where cargo_id = ?'

  database.db.all(sqlForOffice, [cargo], (err, rows) => {
    if (err) {
      throw err
    }
    const candidates = JSON.stringify(rows)
    response.send(candidates)
  })
}




module.exports = {
    searchByCandidate,
    searchByOffice
}