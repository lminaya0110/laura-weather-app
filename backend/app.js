// Imports
const { response } = require('express')
const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geolocation = require('./geolocation/geocoding')
const forecast = require('./weather/forecast')

// Variables
const app = express()
const port = process.env.PORT || 3000

// Define Paths for Express Config
const frontendDirectory = path.join(__dirname, '../frontend')
const partialsDirectory = path.join(__dirname, '../frontend/partials')


// Setup Handlebars for an engine
app.set('view engine', 'hbs')
app.set('views', frontendDirectory)
hbs.registerPartials(partialsDirectory)

// Setup Static Directory ro Serve
app.use(express.static(frontendDirectory))

// Routes
app.get('/', (req,res) => {
    res.render('index')
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About the App...'
    })
})

app.get('/weather', (req,res) => {
    res.render('weather')
})

app.get('/forecast', (req,res) => {
    // Setting Data
    const address = req.query.address

    // Missing Address
    if (!address || address.length === 0) {
        return res.send({ error: 'Please provide an address'})
    }

    // Getting Location
    geolocation(address, (error, data) => {
        const location = data.location

        // Handling Error
        if(error) {
            return res.send(error)
        }

        // Getting Weather Information
        forecast(data.latitude, data.longitude, (error, data) => {
            // Handling Error
            if(error) {
                return res.send(error)
            }

            // Handling Data
            res.send({
                location,
                temperature: data.temperature,
                humidity: data.humidity,
                pressure: data.pressure
            })
           
        })
    })
})


// Listening to a Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})