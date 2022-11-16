const express = require("express");
const router = express.Router();
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
router.post("/", createNewTestimonial);

// updating one
router.put("/:id", updateTestimonial);

// deleting one
router.delete("/:id", deleteTestimonial);

router.post("/admin/findAllTestimonial", (req, res) => {
  res.send("done ");
});

module.exports = router;
