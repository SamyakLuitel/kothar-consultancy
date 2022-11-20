const Testimonial = require("../model/testimonialModel");
const { uploader } = require("../utils/imageUploadUtils");

//Testimonial controller

exports.findAllTestimonial = async (req, res, next) => {
  try {
    const testimonialData = await Testimonial.find();
    console.log("find all");
    const testimonial = {
      testimonials: {
        data: testimonialData,
      },
      success: true,
      message: "data fetched",
    };
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

  try {
    console.log(req)
    const img = req.file.path;
    const uploadRes = uploader(img);
    console.log(uploadRes);
    if ((await uploadRes).success) {
      const testimonial = new Testimonial({
        name: req.body.name,
        tetimonial: req.body.tetimonial,
        image: (await uploadRes).file,
      });

      const newTestimonial = await testimonial.save();
      res.status(201).json(newTestimonial);
    } else {
      res.status(500).json({ message: uploadRes.message, success: false });
    }
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
    message: "testimonial  deleted successfully",
    success: true,
  });
};
