require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const connectDatabase = require("./config/databaseConfig");
const { AuthenticateToken } = require("./middleware/auth");

const serviceRoute = require("./router/servicesRoutes");
const destinationRoute = require("./router/destinationRoutes");
const eventRoute = require("./router/eventRoutes");
const testimonialRoute = require("./router/testimonialRoutes");
const uniRoutes = require("./router/universityRoutes");
const authRoutes = require("./router/authRoutes");
const contactUsRoutes = require("./router/contactUsRoutes");
const appointmentRoutes = require("./router/appointmentRoutes");
const newsRoutes = require("./router/newsRoutes");

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 1000000000 },
});

const checkFileType = function (file, cb) {
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png|gif|svg/;
  //check extension names
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);
  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can Only Upload Images!!");
  }
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

console.log(cloudinary.config());

const morgan = require("morgan");
const PORT = process.env.PORT | 3000;
const app = express();

app.use(cors());
app.use(morgan());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }));

connectDatabase();
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
app.use("/kothar/events", eventRoute);
app.use("/kothar/universities", uniRoutes);
app.use("/kothar/news", newsRoutes);
app.use("/kothar/testimonials", testimonialRoute);
app.use("/kothar/book-appointment", appointmentRoutes);
app.use("/kothar/send-message", contactUsRoutes);

// admin
//login 
app.use("/kothar/admin/login", authRoutes);
app.use("/kothar/login", authRoutes);

//kothar services
app.use("/kothar/admin/services", AuthenticateToken, serviceRoute);
app.use("/kothar/admin/destinations", AuthenticateToken, destinationRoute);
app.use("/kothar/admin/events", AuthenticateToken, eventRoute);
app.use("/kothar/admin/universities", AuthenticateToken, uniRoutes);
app.use("/kothar/admin/testimonials", AuthenticateToken, testimonialRoute);
app.use("/kothar/admin/news", AuthenticateToken, newsRoutes);
app.use("/kothar/admin/book-appointment", AuthenticateToken, appointmentRoutes);
app.use("/kothar/admin/send-message", AuthenticateToken, contactUsRoutes);

app.get("/kothar/admin/check", AuthenticateToken, (req, res) => {
  res.send("admin pannel access approved");
});

app.post("/upload", upload.single("image"), async (req, res) => {
  console.log("upload called");
  try {
    console.log(req.body.image);

    const upload = await cloudinary.uploader.upload(req.body.image);

    // console.log(upload);
    console.log(upload.secure_url);
    return res.json({
      success: true,
      file: upload.secure_url,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});
