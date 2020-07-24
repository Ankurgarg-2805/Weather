const request = require('request');

const forecast = (address, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=277ca4e79195029e86ba13713148c563&query=${address}`;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined);
        } else if (response.body.error) {
            callback('Unable to find location!', undefined);
        } else {
            const name = response.body.location.name + ', ' + response.body.location.region + '(' + response.body.location.country + ')';

            const temp = response.body.current.temperature;
            const rain = response.body.current.precip;
            const humidity = response.body.current.humidity;
            const weather = response.body.current.weather_descriptions;
            let forecast_data = `The current weather of ${name} region is ${weather} with temperature ${temp}\xB0C, ${humidity}% humidity and ${rain}% chances to rain`;
            callback(undefined, forecast_data);
        }
    })
}

module.exports = forecast;