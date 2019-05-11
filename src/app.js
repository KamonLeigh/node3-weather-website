const path =require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('../src/utils/forecast');
const geocode = require('../src/utils/geocode');


const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);

// Setup handlebars engine and views location 
app.set('view engine', 'hbs');
app.set('views', viewsPath)

// set up static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {

    res.render('index', {
        title: 'Weather',
        name: 'Byron Dunkley'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Byron Dunkley'
    })

});

app.get('/help', (req, res) => {

    res.render('help', {
        message: 'This is the help page',
        title: 'Help',
        name: 'Byron Dunkley'

    })
});

app.get('/weather', (req, res) => {
    if(!req.query.address){

        return res.send({
            error: 'You must provide an address'
        })
    }

    const address =  req.query.address;

    geocode(address, (error, { latitude, longitude, location } = {}) => {

        if(error) {

            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forcastData) => {

            if(error) {
                return res.send({ error });
            }

            return res.send({ forecast: forcastData, location});
        })
    })

    
});

app.get('/help/*', (req, res) => {

    res.render('404page', {
        title: '404',
        name: 'Byron Dunkley',
        message: 'Help article not found'
    })
})

app.get('/product', (req, res) => {
  
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        product: []
    })

});

app.get('*', (req, res) => {

   res.render('404page', {
       title: '404',
       name:'Byron Dunkley',
       message:'Page not found'
   })
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});