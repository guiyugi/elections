const sqlite = require('sqlite3')

const db = new sqlite.Database('./backend/eleicoes2022pi.db', (error) => {
  if(error) {
      console.log(error.message)
  }
})

module.exports = {
  db
}