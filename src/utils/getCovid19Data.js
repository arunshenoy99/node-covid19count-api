const request = require('request')
const { parse } = require('node-html-parser')
const fs = require('fs')
const path = require('path')

const getCovid19Data = (country, callback) => {
    const url = 'https://www.worldometers.info/coronavirus/'
    request.get({ url }, (error, { body } = {}) => {
        if (error) {
            return callback({ error: 'Unable to scrape' }, undefined)
        }
        let data = ''
        const root = parse(body)
        const table = root.querySelector('#main_table_countries_today')
        const tbody = table.querySelector('tbody')
        const trs = tbody.querySelectorAll('tr')
        trs.forEach((tr) => {
            const tds = tr.querySelectorAll('td')
            tds.forEach((td) => {
                data = data + td.text.toString().trim() + '\t'
            })
            data = data + '\n\n'
        })
        data.trim()
        const filePath = path.join(__dirname, '../data/data.txt')
        fs.writeFileSync(filePath, data)
        callback(undefined, filePath)
    })
}

module.exports = getCovid19Data