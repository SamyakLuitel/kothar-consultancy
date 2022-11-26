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
  try {
    var id = req.params.id;
    const testimonial = await Testimonial.findById(id);
    console.log(testimonial);
    return res.status(200).json({
      testimonial,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

exports.createNewTestimonial = async (req, res, next) => {
  console.log("Creating new Testimonial");

  try {
    console.log(req);
    // const img = req.file.path;
const img =    req.body.image
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

exports.updateTestimonial =  async (req, res, next) => {
  var id = req.params.id;
  const img = req.body.image;
  console.log(req.body)

  var  testimonialUpdate = {
    name: req.body.name,
    tetimonial: req.body.tetimonial,
  };

  console.log(testimonialUpdate)

  if (!(typeof img === 'undefined')) {
    if (img != null) {
      const uploadRes = uploader(img);
      let updatedImage = (await uploadRes).file

      testimonialUpdate = {
        name: req.body.name,
        tetimonial: req.body.tetimonial,
        image: updatedImage,
      };
    }
  }

  const testimonalUpdated = await Testimonial.findByIdAndUpdate(
    id,
    testimonialUpdate
  );
  return res.status(200).json({
    testimonalUpdated,
  });
};



exports.deleteTestimonial = async (req, res, next) => {
  try {
    var id = req.params.id;
    const testimonial = await Testimonial.findByIdAndDelete(id);
    console.log(testimonial);

    return res.status(200).json({
      message: "testimonial  deleted successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
