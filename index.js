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
const eventRouet = require("./router/eventRoutes");
const testimonialRoute = require("./router/testimonialRoutes");
const uniRoutes = require("./router/universityRoutes");
const authRoutes = require("./router/authRoutes");
const contactUsRoutes = require("./router/contactUsRoutes");
const appointmentRoutes = require("./router/appointmentRoutes");
const newsRoutes = require("./router/newsRoutes");

const cloudinary = require("cloudinary").v2;

const multer = require("multer");

// const uploader =  multer({
//   storage: multer.diskStorage({
//     destination:(req, file, callback)=>{
//       callback(null,'./images')
//     },
//     filename:(req,file,callback)=>{
//       console.log(file);
//       callback(null, Date.now()+ path.extname(file.originalname) )
//     }
//   }),
//   limits:{fileSize:500000}
// });

//Setting storage engine
const storageEngine = multer.diskStorage({
  destination: "./images",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

//initializing multer
const upload = multer({
  storage: storageEngine,
  limits: { fileSize: 1000000 },
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

app.use(morgan());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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
app.use("/kothar/admin/book-appointment", AuthenticateToken, appointmentRoutes);
app.use("/kothar/admin/send-message", AuthenticateToken, contactUsRoutes);

app.get("/kothar/admin/check", AuthenticateToken, (req, res) => {
  res.send("admin pannel access approved");
});

app.post("/upload", upload.single("image"), async (req, res) => {
  console.log("upload called");
  // console.log(req);
  try {
    console.log(req.file);

    const upload = await cloudinary.uploader.upload(req.file.path);

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
