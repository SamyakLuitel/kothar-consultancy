const express = require("express");
const router = express.Router();
const uploader = require("../config/multerConfig");
const {
  findAllTestimonial,
  findOneTestimonial,
  createNewTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controller/testimonialController");

//  Testimonials api

// //get all
router.get("/", findAllTestimonial);

// //get one
router.get("/:id", findOneTestimonial);

// //creating one
router.post("/", uploader.single("file"), createNewTestimonial);

// updating one
router.put("/:id", uploader.single("file"), updateTestimonial);

// deleting one
router.delete("/:id", deleteTestimonial);

router.post("/admin/findAllTestimonial", (req, res) => {
  res.send("done ");
});

module.exports = router;
