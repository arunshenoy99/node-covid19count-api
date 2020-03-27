const express = require('express')

const app = express()

app.get('', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    console.log(ip)
})


const port = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Server is up and running on port ' + port)
})