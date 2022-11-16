const Testimonial = require("../model/testimonialModel");

//Testimonial controller

exports.findAllTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.find();
    console.log("find all");
    res.json(testimonial);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.findOneTestimonial = async (req, res, next) => {
  var id = req.body.id;
  const testimonial = await Testimonial.findById(id);
  console.log(testimonial);
  return res.status(200).json({
    testimonial,
  });
};

exports.createNewTestimonial = async (req, res, next) => {
  console.log("Creating new Testimonial");
  const testimonial = new Testimonial({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
  });

  try {
    const newTestimonial = await Testimonial.save();
    res.status(201).json(newTestimonial);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateTestimonial = (req, res, next) => {
  var id = req.params.id;
  const testimonialUpdate = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
  };

  const testimonalUpdated = Testimonial.findByIdAndUpdate(
    id,
    testimonialUpdate
  );
  return res.status(200).json({
    testimonalUpdated,
  });
};

exports.deleteTestimonial = async (req, res, next) => {
  var id = req.params.id;
  const Testimonial = await Testimonial.findByIdAndDelete(id);
  console.log(Testimonial);

  return res.status(200).json({
    message: "testimonial  deleted sucessfully",
    success: true,
  });
};
