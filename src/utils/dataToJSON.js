
const dataToJSON = (data) => {
    let dataJSON = []
    const oldParts = data.split('\n')
    oldParts.forEach((oldPart) => {
        const parts = oldPart.split('\t')
        const dataObject = {
            country: parts[0].toLowerCase(),
            totalCases: parts[1],
            newCases: parts[2],
            totalDeaths: parts[3],
            newDeaths: parts[4],
            totalRecovered: parts[5],
            activeCases: parts[6],
            seriousCases: parts[7],
            totalCasesPerOneMillionPop: parts[8],
            totalDeathsPerOneMillionPop: parts[9] 
        }
        dataJSON = dataJSON.concat(dataObject)
    })
    return dataJSON
}

module.exports = dataToJSON