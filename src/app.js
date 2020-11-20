// import node modules
const path = require('path');
const express = require('express');
const hbs = require('hbs');

// import requested content
const { geocode, weather, joke, cat } = require('./utils/requested_content.js');

// run express app
const app = express();

// define path for express config
const publicDirPath = path.join(__dirname, 'public');
const viewsPath = path.join(__dirname, 'template/views');
const partialsPath = path.join(__dirname, 'template/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirPath));


// setting route pages
// first page
app.get( '', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'Say Hi'
    });
});

// about page
app.get( '/about', (req, res) => {
    res.render('about', {
        title: 'weather app',
        name: 'Ikram Maududi'
    });
});

// help page
app.get( '/help', (req, res) => {
    res.render('help', {
        title: 'help page',
        name: 'FAQ & contact us'
    });
});

// weather page
app.get( '/weather', (req, res) => {
    // check if there exists an input
    let input = req.query.address;
    if (!input) {
        return res.send({
            error: 'Address must be provided'
        });
    };
    // get the geolocation & weather
    geocode( input, (error1, {latitude, longitude, location} = {}) => {
        if (error1) {
            return res.send({
                error: error1
            });
        };
        weather( latitude, longitude, (error2, outputCurrentWeather) => {
            if (error2) {
                return res.send({
                    error: error2
                });
            };
            res.send({
              location: `${location}, (${latitude}, ${longitude})`,
              weather: outputCurrentWeather
            });
        });
    });
    // get the joke
    joke ( (error3, {line1, line2} = {}) => {
        if (error3) {
            return res.send({ error : error3 });
        } else {
            res.send({
                line1,
                line2
            });
        };
    });
    // get the cat
    cat( (error4, {catImageUrl} = {}) => {
        if (error4) {
            return res.send({ error : error4 });
        } else {
            res.send({ catImageUrl });
        };
    });
});


app.get( '/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        });
    };
    console.log(req.query.search);
    req.send({
        products: []
    });
});

// help page
app.get( '/help/*', (req,res) => {
    res.render('error', {
        title: '404 page',
        description: 'Help article not found'
    });
});

// pages other than the stated above
app.get( '*', (req,res) => {
    res.render('error', {
        title: '404 page',
        description: 'Page not found'
    });
});

// turning on local server
const port = process.env.PORT;
app.listen( port, () => console.log(`Server is up on port ${port}`) ); 