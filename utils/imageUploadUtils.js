require("dotenv").config();
const cloudinary = require("cloudinary").v2;

const multer = require("multer");

const uploader = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 500000 },
});
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

console.log(cloudinary.config());

exports.uploader = async (img) => {
  console.log("upload called");
  console.log(img);
  try {
    const upload = await cloudinary.uploader.upload(img);

    console.log(upload);
    console.log(upload.secure_url);
    return {
      success: true,
      file: upload.secure_url,
      message: "image uploaded",
    };
  } catch (err) {
    console.error(err);
    return { message: err.message, success: false };
  }
};
