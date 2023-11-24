const { response } = require('express');
const database = require('./database.js');

function executeQuery(sql, params, response) {
  database.db.all(sql, params, (err, rows) => {
    if (err) {
      console.error('Erro na consulta SQL:', err);
      response.status(500).json({ error: 'Erro na consulta.' });
      return;
    }

    const data = JSON.stringify(rows);
    console.log(`Dados: ${data}`);
    response.send(data);
  });
}

function searchByCandidate(request, response) {
  const candidateName = request.body.name;
  const sql = 'SELECT cand_nome, cargo_nome, cand_votos, cand_status FROM votos_cand_estado WHERE cand_nome LIKE ?';
  executeQuery(sql, [`%${candidateName}%`], response);
}

function searchByOffice(request, response) {
  const office = request.body.office;
  const sql = 'SELECT cand_nome, cargo_nome, cand_votos, cand_status FROM votos_cand_estado WHERE cargo_nome = ?';
  executeQuery(sql, [office], response);
}

function searchOffice(request, response) {
  const cargoId = request.body.cargoId;
  const sql = 'SELECT cand_nome, cargo_nome, cand_votos, cand_status FROM votos_cand_estado WHERE cargo_id = ?';
  executeQuery(sql, [cargoId], response);
}

function listMunicipalities(request, response) {
  const sql = 'SELECT * FROM municipio';
  executeQuery(sql, [], response);
}

function searchByMunicipalities(request, response) {
  const muniId = request.body.selectedValue;
  const sql = 'SELECT cand_nome, cargo_nome, cand_votos, cand_status FROM votos_cand_municipio WHERE muni_id = ?';
  executeQuery(sql, [muniId], response);
}

function getAllCandidates(request, response) {
  const sql = 'SELECT cand_nome, cargo_nome, cand_votos, cand_status FROM votos_cand_estado ORDER BY cand_status, cand_nome ASC';
  executeQuery(sql, [], response);
}

module.exports = {
  searchByCandidate,
  searchByOffice,
  searchOffice,
  listMunicipalities,
  searchByMunicipalities,
  getAllCandidates,
};
