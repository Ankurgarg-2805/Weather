const request = require('request');

const geocode = (address, callback) => {
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?&access_token=pk.eyJ1IjoiYWdhbmt1cjAwMSIsImEiOiJja2JpODdvdHkwY3U4Mnlsc3A4Y2V2dnFxIn0.tJdMQm_kExpYDjHeie_wCw&limit=1`;

    request({ url: geoUrl, json: true }, (error, response) => {
        if (error) { 
            callback('Unable to connect to location services!', undefined);
        } else if(response.body.features.length === 0){
            callback('Unable to find your location!', undefined)
        } else{
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;