const express = require('express')
const getCovid19Data = require('./utils/getCovid19Data')
const dataToJSON = require('./utils/dataToJSON')

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
    getCovid19Data(country, (error, filePath) => {
        if (error) {
            return res.status(500).send()
        }
        if (filePath) {
            const dataJSON = dataToJSON(filePath)
            res.send(dataJSON)
        }
    })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server is up and running on port ' + port)
})