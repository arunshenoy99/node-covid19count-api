const request = require('request')
const { parse } = require('node-html-parser')
const fs = require('fs')

const url = 'https://www.worldometers.info/coronavirus/'
request.get({ url }, (error, { body } = {}) => {
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
    fs.writeFileSync('data.txt', data)
})