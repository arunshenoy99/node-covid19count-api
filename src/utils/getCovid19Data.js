const request = require('request')
const { parse } = require('node-html-parser')
const fs = require('fs')
const path = require('path')
const dataToJSON = require('./dataToJSON')
const moment = require('moment')

const filePath = path.join(__dirname, '../data/data.txt')


const getNotExpiredData = (country) => {
        const buffer = fs.readFileSync(filePath)
        const data = buffer.toString()
        let JSONdata = JSON.parse(data)
        if (!JSONdata) {
            return undefined
        }
        if (country === 'all') {
            return JSONdata
        } else {
            JSONdata = JSONdata.filter((JSONObject) => JSONObject.country === country)
            return JSONdata
        }
}

const getCovid19Data = (country, callback) => {
    try { 
        const stats = fs.statSync(filePath)
        const mtime = moment(stats.mtime)
        const now = moment()
        const minutesPassed = now.diff(mtime, 'minutes')
        if (minutesPassed < 60) {
            const JSONdata = getNotExpiredData(country)
            if (!JSONdata) {
                throw new Error({ error: 'Unable to fetch data '})
            }
            return callback(undefined, JSONdata)
        }
    } catch (e) {}
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
            data = data + '\n'
        })
        data.trim()
        let dataJSON = dataToJSON(data)
        if (!dataJSON) {
            return callback({ error: 'Cannot get JSON data' }, undefined)
        }
        fs.writeFileSync(filePath, JSON.stringify(dataJSON))
        if (country === 'all') {
            return callback(undefined, dataJSON)
        }
        dataJSON = dataJSON.filter((dataObject) => dataObject.country === country)
        callback(undefined, dataJSON)
    })
}

module.exports = getCovid19Data