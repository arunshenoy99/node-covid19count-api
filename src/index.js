const express = require('express')
const getCovid19Data = require('./utils/getCovid19Data')

const app = express()

app.get('', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    console.log(ip)
    res.send('Welcome')
})

app.get('/count', (req, res) => {
    let country = req.query.country
    if (!country) {
        country = 'all'
    }
    getCovid19Data(country, (error, dataJSON) => {
        if (error) {
            return res.status(500).send()
        }
        res.header('Content-Type', 'application/json')
        res.send(JSON.stringify(dataJSON))
    })
})

app.get('*', (req, res) => {
    res.send('<h1>Don\'t be smart just goto <a href="/count">Count</a></h1>')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server is up and running on port ' + port)
})