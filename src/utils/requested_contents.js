const request = require('request');

// secret access key
const waccess = process.env.WEATHER_ACCESS_KEY;
const gaccess = process.env.GEOCODE_ACCESS_KEY;

//in this file, callback expects 2 arguments - error,data

//get the location
const geocode = ( address, callback ) => {
    const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${gaccess}`;
    request( { url, json: true}, (error, { body } = {} ) => {
        if (error) {
            callback('Unable to connect to location service!', undefined);
        } else if (!body.features.length) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            } );
        };
    } );
};

//get the weather
const weather = ( lat, long, callback ) => {
    const url = `http://api.weatherstack.com/current?access_key=${waccess}&query=${lat},${long}`;
    request( { url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            callback(undefined, `It is currently ${body.current.weather_descriptions} out there, with temperature of ${body.current.temperature} degree celcius, but it feels like ${body.current.feelslike} degree celcius`)
        }
    });
};

// get the joke
const joke = (callback) => {
    const jokeUrl = 'https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,religious,racist';
    request( { url: jokeUrl, json: true}, (error, { body } = {} ) => {
        if (error) {
            callback('Unable to get the joke!', undefined);
        } else if (body.type == single) {
            callback(undefined, {
                line1: body.joke,
                line2: '-------------------------------------------------------'
            } );
        } else {
            callback(undefined, {
                line1: body.setup, 
                line2: body.delivery 
            } );
        };
    } );
}
// get the cat pict
const cat = (callback) => {
    const catUrl = 'https://api.thecatapi.com/v1/images/search';
    request( {url: catUrl, json: true}, (error, { body } = {} ) => {
        if (error) {
            callback('Unable to call the cat!', undefined);
        } else {
            callback(undefined, {catImageUrl: body[0].url});
        };
    } );
}


module.exports = {
    geocode,
    weather,
    joke,
    cat
};