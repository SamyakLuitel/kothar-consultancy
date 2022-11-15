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

exports.findOneuniversity = (req, res, next) => {
  const university = University.find();
  console.log(university);

  return res.status(200).json({
    done: "one",
  });
};

exports.createNewuniversity = async (req, res, next) => {
  console.log("Creating new University");
  const University = new University({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
  });

  try {
    const newuniversity = await University.save();
    res.status(201).json(newuniversity);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateNewuniversity = (req, res, next) => {
  const university = University.find();
  console.log(university);

  return res.status(200).json({
    done: "update ",
  });
};

exports.deleteuniversity = (req, res, next) => {
  const university = University.find();
  console.log(university);

  return res.status(200).json({
    done: "delete",
  });
};
