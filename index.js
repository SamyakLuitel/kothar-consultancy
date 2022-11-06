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

const conectDatabase = require('./config/databaseConfig')
const AuthenticateToken = require('./middleware/auth')
const serviceRoute = require('./router/servicesRoutes')


const PORT = 3000;



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


conectDatabase()
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



//listening 
app.listen(3000, () => {
    console.log(`Kothar backend running ..., Started at ${Date()}`)
});



app.use('/kothar/services',serviceRoute)
// //fetch from env in production


// //routes
// /**
//  * @swagger
//  * /login:
//  *  post:
//  *      description: login api
//  *      requestBody:
//  *      required: true 
//  *      parameters:
//  *      - in: body
//  *        name: login
//  *      content:
//  *          application/json
//  *      response:
//  *          '200':
//  *              description: access_token
//  */

// app.post('/login', (req, res) => {
//     //Authenticate user
//     console.log("performing login....")
//     const username = req.body.username;
//     const password = req.body.password;
//     if(username!="admin"){
//         res.send("invalid username")
//     }

//     if(password!="password"){
//         res.send("invalid password")
//     }
//     const user = { name: username }
//     const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET)

//     // add exp time and REFERESH_TOKEN  later 
//     /*
//     * @todo :add exp time and auth functionality 
//     */


//     res.json({ accessToken: accessToken })
// });



// /**
//  * @swagger
//  * /:
//  *  get:
//  *      description: desc api
//  *      requestBody:
//  *      required: true 
//  *      parameters:
//  *      - in: body
//  *        name: desc
//  *      content:
//  *          application/json
//  *      response:
//  *          '200':
//  *              description: access_token
//  */

// app.get('/', cors(), (req, res) => {
//     res.send("Kothar institute [v1]")
// })







// /**
//  * @swagger
//  * /cors:
//  *  get:
//  *      description: version api
//  *      requestBody:
//  *      required: true 
//  *      parameters:
//  *      - in: body
//  *        name: login
//  *      content:
//  *          application/json
//  *      response:
//  *          '200':
//  *              description: access_token
//  */

// app.get('/version', cors(), (req, res) => {
//     res.send("Kothar institute [v1]")
// })


// // /**
// //  * @swagger
// //  * /kothar/services:
// //  *  get:
// //  *      description: services api
// //  *      requestBody:
// //  *      required: true 
// //  *      parameters:
// //  *      - in: body
// //  *        name: login
// //  *      content:
// //  *          application/json
// //  *      response:
// //  *          '200':
// //  *              description: access_token
// //  */

// // app.get('/kothar/services', cors(), (req, res) => {
// //     res.send(serviceData).json();
// // })


// /**
//  * @swagger
//  * /kothar/desination:
//  *  get:
//  *      description: destination api
//  *      requestBody:
//  *      required: true 
//  *      parameters:
//  *      - in: body
//  *        name: destination
//  *      content:
//  *          application/json
//  *      response:
//  *          '200':
//  *              description: access_token
//  */

// app.get('/kothar/destinations', cors(), (req, res) => {
//     // console.log(destData)
//     console.log("destination called..")
//     res.send(destData).json();
// })


// /**
//  * @swagger
//  * /kotahr/events:
//  *  get:
//  *      description: events api
//  *      requestBody:
//  *      required: true 
//  *      parameters:
//  *      - in: body
//  *        name: events
//  *      content:
//  *          application/json
//  *      response:
//  *          '200':
//  *              description: access_token
//  */

// app.get('/kothar/events', cors(), (req, res) => {
//     // console.log(destData)
//     console.log("events called..")
//     res.send(eventData).json();
// })


// /**
//  * @swagger
//  * /kothar/universities:
//  *  get:
//  *      description: universities api
//  *      requestBody:
//  *      required: true 
//  *      parameters:
//  *      - in: body
//  *        name: universities
//  *      content:
//  *          application/json
//  *      response:
//  *          '200':
//  *              description: access_token
//  */

// app.get('/kothar/universities', cors(), (req, res) => {
//     // console.log(destData)
//     console.log("unis called..")
//     res.send(uniData).json();
// })

// /**
//  * @swagger
//  * /kotahr/news:
//  *  get:
//  *      description: news api
//  *      requestBody:
//  *      required: true 
//  *      parameters:
//  *      - in: body
//  *        name: news
//  *      content:
//  *          application/json
//  *      response:
//  *          '200':
//  *              description: access_token
//  */

// app.get('/kothar/news', cors(), (req, res) => {
//     // console.log(destData)
//     console.log("news called..")
//     res.send(newsData).json();
// })

// /**
//  * @swagger
//  * /kothar/tesimonials:
//  *  get:
//  *      description: testimonials api
//  *      requestBody:
//  *      required: true 
//  *      parameters:
//  *      - in: body
//  *        name: login
//  *      content:
//  *          application/json
//  *      response:
//  *          '200':
//  *              description: access_token
//  */

// app.get('/kothar/testimonials', cors(), (req, res) => {
//     // console.log(destData)
//     console.log("news called..")
//     res.send(testimonialData).json();
// })






// /**
//  * @swagger
//  * /kothar/admin:
//  *  get:
//  *      description: admin api
//  *      requestBody:
//  *      required: true 
//  *      parameters:
//  *      - in: body
//  *        name: login
//  *      content:
//  *          application/json
//  *      response:
//  *          '200':
//  *              description: access_token
//  */

// app.get('/kothar/admin/check', AuthenticateToken, (req, res) => {
//     res.send("admin pannel")
// })

// /**
//  * @swagger
//  * /login:
//  *  post:
//  *      description: send message api
//  *      requestBody:
//  *      required: true 
//  *      parameters:
//  *      - in: body
//  *        name: login
//  *      content:
//  *          application/json
//  *      response:
//  *          '200':
//  *              description: access_token
//  */

// app.post('/kothar/send-message', (req, res) => {
//     console.log("send msg ...")
//     res.json({
//         "message": "Your meaasge has been submitted to KOTHAR",
//         "success": true
//     })
// })

// /**
//  * @swagger
//  * /kothar/book-apointment:
//  *  post:
//  *      description: book apointment api
//  *      requestBody:
//  *      required: true 
//  *      parameters:
//  *      - in: body
//  *        name: login
//  *      content:
//  *          application/json
//  *      response:
//  *          '200':
//  *              description: access_token
//  */

// app.post('/kothar/book-appointment', (req, res) => {
//     console.log("book appointment ...")

//     res.json({
//         "message": "Your appoint booking is sucessful",
//         "success": true
//     })
// })





// // https://www.youtube.com/watch?v=apouPYPh_as


