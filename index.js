const express = require("express");
// const path = reqquire('path')

const destData = require("./data/destinations.json");
const serviceData = require("./data/serviceData.json");
const eventData = require("./data/eventsData.json");
const newsData = require("./data/newsData.json");
const testimonialData = require("./data/testimonialsData.json");
const uniData = require("./data/uniDat.json");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// const swaggerOptions = require("./config/swaggerConig");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const conectDatabase = require("./config/databaseConfig");
const {AuthenticateToken} = require("./middleware/auth");

const serviceRoute = require("./router/servicesRoutes");
const destinationRoute = require("./router/destinationRoutes");
const eventRouet = require("./router/eventRoutes");
const testimonialRoute = require("./router/testimonialRoutes");
const uniRoutes = require("./router/testimonialRoutes");
const authRoutes = require("./router/authRoutes");

// image upload

// const multer = require('multer')

// const storage = multer.diskStorage({
//   destination:(req, file, cb) =>{
//     cb(null,'images')
//   },
//   filename:
// }); 
// const uppload  = multer({storage:})

const morgan = require("morgan")

const PORT = 3000;

const app = express();

app.use(morgan())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

conectDatabase();
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "KOTHAR API",
      description: "Kothar api doc",
      contact: {
        name: "samk",
      },
      servers: ["http://localhost:5000"],
    },
  },
  apis: ["index.js "],
};
const swaggerDoc = swaggerJsDoc(swaggerOptions);

//swagger api docs
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

//listening
app.listen(PORT, () => {
  console.log(`Kothar backend running ..., Started at ${Date()}`);
});

app.use("/kothar/services", serviceRoute);
app.use("/login", authRoutes);

app.get("/", cors(), (req, res) => {
  res.send("Kothar institute [v1]");
});

app.get("/version", cors(), (req, res) => {
  res.send("Kothar institute [v1]");
});

app.use("/kothar/destinations", destinationRoute);

app.use("/kothar/events", eventRouet);

app.use("/kothar/universities", uniRoutes);

app.get("/kothar/news", cors(), (req, res) => {
  console.log("news called..");
  res.send(newsData).json();
});

app.get("/version", (req, res)=>{
  res.sendFile('./stat')
})
app.use("/kothar/testimonials", testimonialRoute);

// admin 

app.use("/admin/login", authRoutes);

app.use("/admin/services",AuthenticateToken, serviceRoute);
app.use("/admin/destinations",AuthenticateToken, destinationRoute);
app.use("/admin/events", AuthenticateToken,eventRouet);
app.use("/admin/universities",AuthenticateToken, uniRoutes);

app.get("/kothar/news", cors(), (req, res) => {
  console.log("news called..");
  res.send(newsData).json();
});

app.get("/version", (req, res)=>{
  res.sendFile('./stat')
})
app.use("/kothar/testimonials", testimonialRoute);


app.get("/kothar/admin/check", AuthenticateToken, (req, res) => {
  res.send("admin pannel access aproved");
});

app.post("/kothar/send-message", (req, res) => {
  console.log("send msg ...");
  res.json({
    message: "Your meaasge has been submitted to KOTHAR",
    success: true,
  });
});

app.post("/kothar/book-appointment", (req, res) => {
  console.log("book appointment ...");
  res.json({
    message: "Your appoint booking is sucessful",
    success: true,
  });
});
