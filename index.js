const express = require('express');
// const path = reqquire('path')

const destData = require('./data/destinations.json')
const serviceData = require('./data/serviceData.json')
const eventData = require('./data/eventsData.json')
const newsData = require('./data/newsData.json')
const testimonialData = require('./data/testimonialsData.json')
const uniData = require('./data/uniDat.json')
const cors = require('cors')
const jwt = require('jsonwebtoken')

// const swaggerOptions = require('./config/swaggerConig')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())



const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "KOTHAR API",
            description: "Kothar api doc",
            contact: {
                name: "samk"
            },
            servers: ['http://localhost:5000']


        }
    },
    apis: ["index.js "]
}

const swaggerDoc = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))

const PORT = 3000;
const ACCESS_TOKEN_SECRET = "secret";
//fetch from env in production

app.post('/login', (req, res) => {
    //Authenticate user
    console.log("performing login....")
    const username = req.body.username;
    const user = { name: username }
    const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET)

    // add exp time and REFERESH_TOKEN  later 
    /*
    * @todo :add exp time and auth functionality 
    */


    res.json({ accessToken: accessToken })
});

app.get('/', cors(), (req, res) => {
    res.send("Kothar institute [v1]")
})


app.get('/cors', cors(), (req, res) => {
    res.send("Kothar institute [v1]")
})

app.get('/kothar/services', cors(), (req, res) => {
    res.send(serviceData).json();
})

app.get('/kothar/destinations', cors(), (req, res) => {
    // console.log(destData)
    console.log("destination called..")
    res.send(destData).json();
})


app.get('/kothar/events', cors(), (req, res) => {
    // console.log(destData)
    console.log("events called..")
    res.send(eventData).json();
})


app.get('/kothar/universities', cors(), (req, res) => {
    // console.log(destData)
    console.log("unis called..")
    res.send(uniData).json();
})


app.get('/kothar/news', cors(), (req, res) => {
    // console.log(destData)
    console.log("news called..")
    res.send(newsData).json();
})


app.get('/kothar/testimonials', cors(), (req, res) => {
    // console.log(destData)
    console.log("news called..")
    res.send(testimonialData).json();
})

//listening 
app.listen(3000, () => {
    console.log(`Kothar backend running ..., Started at ${Date()}`)
});

function AuthenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    // format Bearer TOKEN

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        console.log(user)
        req.user = user
        next()
    })
}


app.get('/kothar/admin', AuthenticateToken, (req, res) => {
    res.send("admin pannel")
})

app.post('/kothar/send-message', (req, res) => {
    console.log("send msg ...")
    res.json({
        "message": "Your meaasge has been submitted to KOTHAR",
        "success": true
    })
})


app.post('/kothar/book-appointment', (req, res) => {
    console.log("book appointment ...")

    res.json({
        "message": "Your appoint booking is sucessful",
        "success": true
    })
})
