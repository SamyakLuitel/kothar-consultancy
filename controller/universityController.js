const University = require("../model/uniModel");

//university controller

exports.findAlluniversity = async (req, res, next) => {
  try {
    const university = await University.find();
    console.log("find all");
    res.json(university);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.findOneuniversity = async (req, res, next) => {
  var id = req.body.id;
  const university = await University.findById(id);
  console.log(university);

  return res.status(200).json({
    university,
  });
};

exports.createNewuniversity = async (req, res, next) => {
  console.log("Creating new University");
  const university = new University({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
  });

  try {
    const newuniversity = await university.save();
    res.status(201).json(newuniversity);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateNewuniversity = async (req, res, next) => {
  var id = req.params.id;

  const uniUpdate = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
  };

  const uniUpdated = await University.findByIdAndUpdate(id, uniUpdate);
  return res.status(200).json({
    uniUpdated,
  });
};

exports.deleteuniversity = async (req, res, next) => {
  var id = req.params.id;
  const university = await University.findByIdAndDelete(id);

  return res.status(200).json({
    message: "university deleted sucessfully",
    success: true,
  });
};
