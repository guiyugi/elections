
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

  function searchByOffice(office, response) {
  const sqlForOffice = 'SELECT cand_nome, cargo_nome, cand_votos from votos_cand_estado where cargo_nome= ?'
  database.db.all(sqlForOffice, [cargo], (err, rows) => {
    if (err) {
      throw err
    }
    const candidates = JSON.stringify(rows)
    response.send(candidates)
  })}

  function searchOffice(request, response) {
    console.log('Requisição POST recebida')

  const cargoId = request.body.cargoId;

  const sqlOffice = 'SELECT cand_nome,  cargo_nome, cand_votos, cand_status FROM votos_cand_estado WHERE cargo_id = ?'

  database.db.all(sqlOffice, [cargoId], (err, rows) => {
    if (err) {
      throw err;
    }

    response.json(rows); // Envie a resposta após o término de todas as linhas
  });
}





module.exports = {
    searchByCandidate,
    searchByOffice,
    searchOffice
}