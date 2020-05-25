const API_KEY = require('./API_KEY.js');
const https = require('https');
const http = require('http');
const key = API_KEY['API_KEY'];

function dashboard(name, region, timestamp, temp, conditions) {
    let weatherBoard = ""
    weatherBoard += `\n/****** ${name}, ${region} ******/\n`
    weatherBoard += `\n\n*        ${temp}ºF, ${conditions}         *\n\n`
    weatherBoard += `\n/*****    ${timestamp}   *****/\n`
    console.log(weatherBoard);
}

function printError(error) {
    console.error(error.message)
}

function getWeatherFor(query) {
    const request = https.get(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${query})`, res => {
        let body = '';
        // console.log(API_KEY)
    
        if(res.statusCode == 200) {
            res.on('data', data => {
                body += data.toString();
                // console.log(body);
            })
    
            res.on('end', () => {
                try{
                    const weatherInfo = JSON.parse(body);
                    const { 
                        name,
                        region,
                        timestamp,
                        temp,
                        conditions
                    } = { 
                        name: weatherInfo.location.name,
                        region: weatherInfo.location.region,
                        timestamp: weatherInfo.current.last_updated,
                        temp: weatherInfo.current.temp_f,
                        conditions: weatherInfo.current.condition.text
                    }
                    dashboard(name, region, timestamp, temp, conditions)
                    // console.log(conditions);
                } catch(e) {
                    printError(e)
                }
            })
    
    
        } else {
            const message = `There was an error retrieving the weather details for ${query} (${http.STATUS_CODES[res.statusCode]})`
            const statusCodeError = new Error(message)
            printError(statusCodeError)
        }
    })
}

module.exports.getWeatherFor = getWeatherFor