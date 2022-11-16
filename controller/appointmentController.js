const e = require("express");
const Appointment = require("../model/appointmentModel");

exports.findAllAppiontment = async (req, res, next) => {
  try {
    const allAppointment = await Service.find();
    console.log("find all appointment ");
    res.json(allAppointment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.findOneAppointment = async (Req, res, next) => {
  var id = req.params.id;
  console.log(id);
  const appointment = await Appointment.findById(id);
  console.log(appointment);

  return res.status(200).toJson({
    appointment,
  });
};

exports.createNewAppointment = async (Req, res, next) => {
  console.log("creating new appointment");
  const appointment = new Appointment({
    enquiryType: req.body.enquiryType,
    name: req.body.name,
    email: req.body.emal,
    enquiry: req.body.enquiry,
    requestedDate: new Date(),
  });

  try {
    const newAppointment = await appointment.save();
    return res.json({
      message: "Your appoint booking is sucessful",
      success: true,
    });
    // res.status(201).json(newAppointment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateAppointment = async (req, res, next) => {
  console.log("Update news called ");
  var id = req.params.id;
  const appointmentUpdate = {
    enquiryType: req.body.enquiryType,
    name: req.body.name,
    email: req.body.emal,
    enquiry: req.body.enquiry,
    requestedDate: new Date(),
  };

  const appointmentUpdated = await Appointment.findByIdAndUpdate(
    id,
    appointmentUpdate
  );

  return res.status(200).json({
    appointmentUpdate,
  });
};

exports.deleteAppointment = async (req, res, next) => {
  console.log("delete apointment called");
  var id = req.params.id;
  await Appointment.findByIdAndDelete(id);
  console.log(id);

  return res.status(200).json({
    message: "appointment deleted",
    success: true,
  });
};
