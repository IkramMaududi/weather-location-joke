/*
* !require is from nodejs & can't be used in browser
* TODO: remove the nodejs code to utils, and add the express route in app.js, and then fetch the link here
*/

console.log('Client side javascript is loaded');
const request = require('request');

// Select html element
const weatherForm = document.querySelector('form');
const search = weatherForm.firstElementChild;
const message1 = document.getElementById('message1');
const message2 = document.getElementById('message2');
const joke1 = document.getElementById('joke1');
const joke2 = document.getElementById('joke2');
const cat0 = document.getElementById('cat0');
const cat1 = document.getElementById('cat1');

/* URL location
* * For uploading to heroku, remove http://localhost:3000 from /weather....
* * For development, add http://localhost:<port> before /weather....
*/
const jokeUrl = 'https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,religious,racist';
const catUrl = 'https://api.thecatapi.com/v1/images/search';
const weatherUrl = `http://localhost:3000/weather?address=${search.value}`;


weatherForm.addEventListener('submit', (e) => {
    // initial
    e.preventDefault();
    message1.textContent = '-----Now loading-----';

    // get the weather
    request( { url: weatherUrl, json: true}, (err, res, body ) => {
        if (err) {
            message1.textContent = err;
        } else {
            message1.textContent = res.location;
            message2.textContent = res.weather;
        };
    } );

    // get the joke
    request( { url: jokeUrl, json: true}, (err, res, body) => {
        if (err) {
            joke1.textContent = 'Sorry, joke is not available for the moment';
        } else if (res.type == "single") {
            joke1.textContent = res.joke;
        } else if (res.type == "twopart") {
            joke1.textContent = res.setup;
            joke2.textContent = res.delivery;
        };        
    } );

    // get the cat pict
    requtest( {url: catUrl, json: true}, (err, res, body) => {
        if (err) {
            cat1.textContent = 'Sorry, the cat is not in its place. Please come again later';
        } else {
            const src = res.url;
            cat1.textContent = 'The cat will show up below in a moment';

            const pict = document.createElement("IMG");
            pict.setAttribute("src", src);
            pict.setAttribute("width", "304");
            pict.setAttribute("height", "228");
            pict.setAttribute("alt", "a cat");
            cat0.appendChild(pict);
        };
    } );
} );