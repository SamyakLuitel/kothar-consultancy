const express = require("express");
const newsData = require("./data/newsData.json");
const cors = require("cors");

// const swaggerOptions = require("./config/swaggerConig");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const conectDatabase = require("./config/databaseConfig");
const { AuthenticateToken } = require("./middleware/auth");

const serviceRoute = require("./router/servicesRoutes");
const destinationRoute = require("./router/destinationRoutes");
const eventRouet = require("./router/eventRoutes");
const testimonialRoute = require("./router/testimonialRoutes");
const uniRoutes = require("./router/universityRoutes");
const authRoutes = require("./router/authRoutes");

const contactUsRoutes = require("./router/contactUsRoutes");
const appointmentRoutes = require("./router/appointmentRoutes");
const newsRoutes = require("./router/newsRoutes");

// image upload

// const multer = require('multer')

// const storage = multer.diskStorage({
//   destination:(req, file, cb) =>{
//     cb(null,'images')
//   },
//   filename:
// });
// const uppload  = multer({storage:})

const morgan = require("morgan");

const PORT = 3000;

const app = express();

app.use(morgan());
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

app.get("/", cors(), (req, res) => {
  res.send("Kothar institute [v1]");
});

app.get("/version", cors(), (req, res) => {
  res.send("Kothar institute [v1]");
});


//public 
app.use("/login", authRoutes);
app.use("/kothar/services", serviceRoute);
app.use("/kothar/destinations", destinationRoute);
app.use("/kothar/events", eventRouet);
app.use("/kothar/universities", uniRoutes); 
app.use("/kothar/news", newsRoutes);
app.use("/kothar/testimonials", testimonialRoute);
app.use("/kothar/book-appointment", appointmentRoutes);
app.use("/kothar/send-message", contactUsRoutes);


// admin
app.use("/kothar/admin/login", authRoutes);
app.use("/kothar/login", authRoutes);
app.use("/kothar/admin/services", AuthenticateToken, serviceRoute);
app.use("/kothar/admin/destinations", AuthenticateToken, destinationRoute);
app.use("/kothar/admin/events", AuthenticateToken, eventRouet);
app.use("/kothar/admin/universities", AuthenticateToken, uniRoutes);
app.use("/kothar/admin/testimonials", AuthenticateToken, testimonialRoute);
app.use("/kothar/admin/news", AuthenticateToken, newsRoutes);
app.use("/kothar/admin/book-appointment",AuthenticateToken,appointmentRoutes)
app.use("/kothar/admin/send-message",AuthenticateToken, contactUsRoutes)


app.get("/kothar/admin/check", AuthenticateToken, (req, res) => {
  res.send("admin pannel access approved");
});
