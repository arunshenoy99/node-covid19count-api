# node-covid19count-api
An API that gives various details related to covid19 around the world

HTTP GET Request to https://shenoy-covid19-api.herokuapp.com/
Gives a small welcome statement

HTTP GET https://shenoy-covid19-api.herokuapp.com/count gives JSON data of covid19 cases around the world
JSON data is an array of objects
Each object has properties
country
totalCases
newCases
totalDeaths
newDeaths
totalRecovered
activeCases
seriousCases
totalCasesPerOneMillionPop
totalDeathsPerOneMillionPop

/count also takes the query parameter "country=country_name" and returns only the country specified in the name
/count?country=india gives
[
{
"country": "india",
"totalCases": "887",
"newCases": "+160",
"totalDeaths": "20",
"newDeaths": "",
"totalRecovered": "73",
"activeCases": "794",
"seriousCases": "",
"totalCasesPerOneMillionPop": "0.6",
"totalDeathsPerOneMillionPop": "0.01"
}
]

The app also uses caching of data to improve server response time
If the data stored is not longer than the 30 mins then that data is returned
If the data stored is longer than 30 mins then new data is scraped from the url
