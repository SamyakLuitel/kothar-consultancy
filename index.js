const express = require('express');
// const path = reqquire('path')

const destData = require('./data/destinations.json')
const serviceData = require('./data/serviceData.json')
const eventData = require('./data/eventsData.json')
const newsData = require('./data/newsData.json')
const testimonialData = require('./data/testimonialsData.json')
const uniData = require('./data/uniDat.json')
const cors = require('cors')



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

const PORT = 3000;

app.get('/', (req, res) => {
    res.send("Kothar institute [v1]")
})


app.get('/cors', (req, res) => {
    res.send("Kothar institute [v1]")
})

app.get('/kothar/services', (req, res) => {
    res.send(serviceData).json();
})

app.get('/kothar/destinations', (req, res) => {
    // console.log(destData)
    console.log("destination called..")
    res.send(destData).json();
})


app.get('/kothar/events', (req, res) => {
    // console.log(destData)
    console.log("events called..")
    res.send(eventData).json();
})


app.get('/kothar/universities', (req, res) => {
    // console.log(destData)
    console.log("unis called..")
    res.send(uniData).json();
})


app.get('/kothar/news', (req, res) => {
    // console.log(destData)
    console.log("news called..")
    res.send(newsData).json();
})


app.get('/kothar/testimonials', (req, res) => {
    // console.log(destData)
    console.log("news called..")
    res.send(testimonialData).json();
})

//listening 
app.listen(3000, () => {
    console.log(`Kothar backend running ..., Started at ${Date()}`)
});