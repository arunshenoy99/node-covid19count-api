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
    getCovid19Data(country.toLowerCase(), (error, JSONdata) => {
        if (error) {
            return res.status(500).send({ error })
        }
        if (JSONdata.length === 0) {
            return res.status(404).send({ error: 'We have no data on such a country, please check the country name again boss and try again' })
        }
        res.header('Content-Type', 'application/json')
        res.send(JSON.stringify(JSONdata))
    })
})

app.get('*', (req, res) => {
    res.send('<h1>Don\'t be smart just goto <a href="/count">Count</a></h1>')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server is up and running on port ' + port)
})