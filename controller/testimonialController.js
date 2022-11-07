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

exports.findOneTestimonial = (req, res, next) => {
  const testimonial = Testimonial.find();
  console.log(testimonial);

  return res.status(200).json({
    done: "one",
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
  const testimonial = Testimonial.find();
  console.log(testimonial);

  return res.status(200).json({
    done: "update ",
  });
};

exports.deleteTestimonial = (req, res, next) => {
  const Testimonial = Testimonial.find();
  console.log(Testimonial);

  return res.status(200).json({
    done: "delete",
  });
};
