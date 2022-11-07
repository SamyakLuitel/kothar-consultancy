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
const AuthenticateToken = require('./middleware/auth')

const serviceRoute = require("./router/servicesRoutes");
const destinationRoute = require("./router/destinationRoutes");
const eventRouet = require("./router/eventRoutes");
const testimonialRoute = require("./router/testimonialRoutes");
const uniRoutes = require("./router/testimonialRoutes");

const PORT = 3000;

const app = express();

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

app.post("/login", (req, res) => {
  //Authenticate user
  console.log("performing login....");
  const username = req.body.username;
  const password = req.body.password;
  if (username != "admin") {
    res.send("invalid username");
  }

  if (password != "password") {
    res.send("invalid password");
  }
  const user = { name: username };
  const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET);

  // add exp time and REFERESH_TOKEN  later
  /*
   * @todo :add exp time and auth functionality
   */

  res.json({ accessToken: accessToken });
});

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

app.use("/kothar/testimonials", testimonialRoute);

// app.get("/kothar/admin/check", AuthenticateToken, (req, res) => {
//   res.send("admin pannel");
// });

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
