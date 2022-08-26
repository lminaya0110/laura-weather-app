// Imports
const request = require('request')

// Variables
const access_token = '02dcaba0505aed52c25f82a618cc51ad'

// Forecast
const forecast = (Latitude, Longitude, callback) => {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${Latitude}&lon=${Longitude}&appid=${access_token}`

    request({ url, json: true }, (error, { body }) => {
        // Handling Errors
        if(error){
            return callback('There was an error with forecast servers', undefined)
        }

        // Handling Missing Data
        if(body.error){
            return callback('Unable to find location', undefined)
        }

        // Returning Data
        callback(undefined, {
            temperature: body.current.temp,
            humidity: body.current.humidity,
            pressure: body.current.pressure
    
        })
    })
}

//Exports
module.exports = forecast