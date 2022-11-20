const University = require("../model/uniModel");

//university controller

exports.findAllUniversity = async (req, res, next) => {
  try {
    const university = await University.find();
    console.log("find all");
    const respData = {
      success: true,
      message: "data fetched",
      universities: university,
    };
    res.json(respData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.findOneUniversity = async (req, res, next) => {
  var id = req.params.id;
  const university = await University.findById(id);
  console.log(university);
  return res.status(200).json({
    university,
  });
};

exports.createNewUniversity = async (req, res, next) => {
  console.log("Creating new University");
  const university = new University({
    name: req.body.name,
    destId: req.body.destId,
    image: req.body.image,
    website: req.body.website,
  });

  try {
    const newuniversity = await university.save();
    const resData = {
      data: newuniversity,
      success: true,
      message: "university data created !",
    };
    res.status(201).json(resData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateNewUniversity = async (req, res, next) => {
  var id = req.params.id;

  const uniUpdate = {
    name: req.body.name,
    destId: req.body.destId,
    image: req.body.image,
    website: req.body.website,
  };

  const uniUpdated = await University.findByIdAndUpdate(id, uniUpdate);

  const resData = {
    success: true,
    message: "university data updated !",
  };
  return res.status(200).json(
    resData,
  );
};

exports.deleteUniversity = async (req, res, next) => {
  var id = req.params.id;
  const university = await University.findByIdAndDelete(id);

  return res.status(200).json({
    message: "university deleted successfully",
    success: true,
  });
};
