const Service = require("../model/serviceModel");
const { uploader } = require("../utils/imageUploadUtils");

//service controller
exports.findAllService = async (req, res, next) => {
  try {
    const allServices = await Service.find();
    console.log("find all");
    const serviceData = {
      serviceMotto:
        "Provide awesome customer service with our experienced teachers",
      services: allServices,
      success: true,
      message: "data fetched",
    };
    res.json(serviceData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.findOneService = async (req, res, next) => {
  try {
    var id = req.params.id;
    const service = await Service.findById(id);
    return res.status(200).json({
      service,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message, success: false });
  }
};

exports.createNewService = async (req, res, next) => {
  console.log("Creating new service");


  try {
    const img = req.body.image;
    const uploadRes = uploader(img);

    const service = new Service({
      serviceName: req.body.serviceName,
      descripttion: req.body.descripttion,
      image: (await uploadRes).file,
      what: req.body.what,
      who: req.body.who,
      more: req.body.more,
    });
    const newService = await service.save();
    const response = {
      data: newService,
      message: "Service Added successfully",
      success: true,
    };
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, success: false });
  }
};

exports.updateNewService = async (req, res, next) => {
  console.log("Update service called");
  var id = req.params.id;
  var img = req.body.image

  var serviceUpdate = {
    serviceName: req.body.serviceName,
    descripttion: req.body.descripttion,
    what: req.body.what,
    who: req.body.who,
    more: req.body.more,
  };


  if (!(typeof img === 'undefined')) {
    if (img != null) {
      const uploadRes = uploader(img);
      let updatedImage = (await uploadRes).file

      serviceUpdate = {
        serviceName: req.body.serviceName,
        descripttion: req.body.descripttion,
        what: req.body.what,
        who: req.body.who,
        more: req.body.more,
        image: updatedImage,
      };
    }
  }
  try {
    const serviceUpdated = await Service.findByIdAndUpdate(id, serviceUpdate);
    return res.status(200).json({
      message: "Service updated successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, success: false });
  }
};

exports.deleteService = async (req, res, next) => {
  console.log("delete service called");
  try {
    var id = req.params.id;
    const services = await Service.findByIdAndDelete(id);
    return res.status(200).json({
      message: "service deleted successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message, success: false });
  }
};
