const express = require('express')
const endpoints = require('./endpoints')
const app = express()

app.use(express.static('./frontend'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/candidatos', endpoints.searchByCandidate)

app.listen(3333, () => {
    console.log('o servidor iniciou')
})

