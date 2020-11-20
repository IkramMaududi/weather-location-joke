const request = require('request');
const gaccess = process.env.GEOCODE_ACCESS_KEY;

//callback expects 2 arguments - error,data
const geocode = ( address, callback ) => {
    const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${gaccess}`;
    request( { url, json: true}, (error, { body } ) => {
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

module.exports = geocode;
