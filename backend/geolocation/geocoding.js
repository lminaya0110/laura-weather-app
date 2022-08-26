// Imports
const request = require('request')

// Variables
const accessToken = 'pk.eyJ1IjoibGNtbmF5YSIsImEiOiJjbDdhamhtNDcwMjh2M3pvMzh3ajJ3eWk1In0._u9ULKXBVwOQHPEkh3aNQA'

// Geocoding
const geocoding = (address, callback) => {
    request(
        {
            url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${accessToken}`,
            json: true
        },
        (error, response) => {
            // Handling Errors
            if(error) {
                return callback('There was an error with location servers', undefined)
            }

            //Handling Missing Data
            if(response.body.features.length === 0) {
                return callback('Unable to find location', undefined)
            }

            // Returning Data
            return callback(undefined, {
                location: response.body.features[0].place_name,
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1]
            })
        }
    )
}

// Exports
module.exports = geocoding