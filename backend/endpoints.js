const database = require('./database.js');

function searchInDatabase(candidate, response) {
  const sqlForCandidate = 'SELECT cand_nome, cargo_nome, cand_votos FROM votos_cand_estado WHERE cand_nome LIKE ?';

  database.db.all(sqlForCandidate, [`%${candidate}%`], (err, rows) => {
    if (err) {
      console.error('Erro na consulta SQL:', err);
      throw err;
    }

    const candidates = JSON.stringify(rows);
    console.log(`lista -> ${candidates}`);
    response.send(candidates);
  });
}


function searchByCandidate(request, response) {
  const candidateName = request.body.name;
  searchInDatabase(candidateName, response);
}

function searchByOffice(office, response) {
  const sqlForOffice = 'SELECT cand_nome, cargo_nome, cand_votos FROM votos_cand_estado WHERE cargo_nome = ?';
  
  database.db.all(sqlForOffice, [office], (err, rows) => {
    if (err) {
      throw err;
    }

    const candidates = JSON.stringify(rows);
    response.send(candidates);
  });
}

function searchOffice(request, response) {
  console.log('Requisição POST recebida');
  const cargoId = request.body.cargoId;
  const sqlOffice = 'SELECT cand_nome, cargo_nome, cand_votos, cand_status FROM votos_cand_estado WHERE cargo_id = ?';

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
};