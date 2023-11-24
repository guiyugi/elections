const { response } = require('express');
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
function listMunicipalities(request, response){
  const listMunicipalities = 'SELECT * FROM municipio'
  

  

  database.db.all(listMunicipalities, (err, rows) => {
    if (err) {
      throw err
    }

    const sortedMunicipalities = rows.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' }))
    const municipalities = JSON.stringify(sortedMunicipalities)
    response.send(municipalities)
  })
  
}


function searchByMunicipalities(request, response) {
  const sqlForMunicipalities = 'SELECT cand_nome, cargo_nome, cand_votos, cand_status FROM votos_cand_municipio WHERE muni_id = ?'
  const chosenMunicipalityId = request.body.selectedValue
  database.db.all(sqlForMunicipalities, [chosenMunicipalityId], (err, rows) => {
    if (err) {
      throw err
    }

    if (rows.length === 0) {
      // Se nenhum município for encontrado com o muni_id fornecido
      response.status(404).send('Município não encontrado')
    } else {
      // Se encontrar o município, enviar os dados ao cliente
      const municipalityData = JSON.stringify(rows)
      response.send(municipalityData)
      
      // Registre as informações no console do servidor
      console.log('Dados do município selectedValue:', municipalityData)
    }
  })
}

function getAllCandidates(request, response) {
  const sqlForAllCandidates = 'SELECT cand_nome, cargo_nome, cand_votos, cand_status FROM votos_cand_estado ORDER BY cand_status, cand_nome ASC';

  database.db.all(sqlForAllCandidates, (err, rows) => {
    if (err) {
      response.status(500).json({ error: 'Erro na consulta.' });
      return;
    }

    // Converte os resultados para o formato JSON
    const candidatesData = JSON.stringify(rows);

    // Envia os resultados filtrados ao cliente
    response.send(candidatesData);
  });
}









module.exports = {
  searchByCandidate,
  searchByOffice,
  searchOffice,
  listMunicipalities,
  searchByMunicipalities,
  getAllCandidates
};