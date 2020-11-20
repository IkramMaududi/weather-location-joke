const request = require('request');
const waccess = process.env.WEATHER_ACCESS_KEY;

//callback expects 2 arguments - error,data
const weather = ( lat, long, callback ) => {
    const url = `http://api.weatherstack.com/current?access_key=${waccess}&query=${lat},${long}`;
    request( { url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            callback(undefined, `It is currently ${body.current.weather_descriptions} out there, with temperature of ${body.current.temperature} degree celcius, but it feels like ${body.current.feelslike} degree celcius`)
        }
    });
};

module.exports = weather;
