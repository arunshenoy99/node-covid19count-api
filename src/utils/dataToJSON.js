const fs = require('fs')
const readline = require('readline')
const dataToJSON = (path) => {
    let dataJSON = []
    const myInterface = readline.createInterface({
        input: fs.createReadStream(path)

    })
    myInterface.on('line', (line) => {
        console.log(line)
    })
}

module.exports = dataToJSON