let weather = require('./weather.js')

// console.log(process.argv)
let query = process.argv.slice(2)
weather.getWeatherFor(query)