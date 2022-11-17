const Destination = require("../model/destinationModel");

//destination controller

exports.findAllDestination = async (req, res, next) => {
  try {
    const destinationData = await Destination.find();
    console.log("find all");

    const allDest = {
      destinations: destinationData,
      success: true,
      message: "data fetched",
    };
    res.json(allDest);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.findOneDestination = async (req, res, next) => {
  var id = req.params.id;
  const destination = await Destination.findById();
  console.log(destination);

  return res.status(200).json({
    destination,
  });
};

exports.createNewDestination = async (req, res, next) => {
  console.log("Creating new Destination");
  const destination = new Destination({
    destination: req.body.destination,
    destinationDesc: req.body.destinationDesc,
    image: req.body.image,
    whyDestination: req.body.whyDestination,
    ans: req.body.ans,
  });

  try {
    const newDestination = await destination.save();
    res.status(201).json(newDestination);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateDestination = async (req, res, next) => {
  var id = req.params.id;

  const destinationUpdate = {
    destination: req.body.destination,
    destinationDesc: req.body.destinationDesc,
    image: req.body.image,
    whyDestination: req.body.whyDestination,
    ans: req.body.ans,
  };
  try {
    const destinationUpdated = await Destination.findByIdAndUpdate(
      id,
      destinationUpdate
    );
    return res.status(200).json({
      message: "Service updated successfully",
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

exports.deleteDestination = async (req, res, next) => {
  console.log("delete destination called ");
  var id = req.params.id;
  const destination = await Destination.findByIdAndDelete(id);
  console.log(destination);

  return res.status(200).json({
    message: "destination deleted sucessfully",
    success: true,
  });
};
