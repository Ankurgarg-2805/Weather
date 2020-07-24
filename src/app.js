const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./util/forecast');
const geocode = require('./util/geocode');

const app = express();

const publicPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));


app.get('', (req, res)=>{
    res.render('index', {
        title: 'Welcome to Weather',
        name: 'Ankur Garg'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'Welcome to Weather',
        name: 'Ankur Garg'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Welcome to Weather',
        name: 'Ankur Garg'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "You didn't entered the address"
        })
    }
    geocode(req.query.address, (errorGeo, dataGeo) => {
        if (errorGeo) {
            return res.send({
                error: errorGeo
            });
        } else {
            let address = dataGeo.location;
            forecast(address, (errorFore, dataFore) => {
                if (errorFore) {
                    return res.send({
                       error: errorFore
                    });
                } else {
                    return res.send({
                        Location : address,
                        Forecast: dataFore
                    });
                }
            })
        }
    })
})

app.get('/help/*', (req, res)=>{
    res.render('error', {
        title: 'Welcome to Weather App',
        name: 'Ankur Garg',
        message: 'Err: Unable to access Help Article'
    });
})

app.get('*', (req, res)=>{
    res.render('error', {
        title: 'Welcome to Weather App',
        name: 'Ankur Garg',
        message: 'Err: 404! Page Not Found'
    });
})

app.listen(3000, ()=>{
    console.log('http://127.0.0.1:3000');
})