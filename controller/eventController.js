const Event = require("../model/eventModel");

//event controller

exports.findAllEvent = async (req, res, next) => {
  try {
    const event = await Event.find();
    console.log("find all");
    res.json(event);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.findOneEvent = async (req, res, next) => {
  var id = req.params.id;
  const event = await Event.findById(id);
  console.log(event);

  return res.status(200).json({
    event,
  });
};

exports.createNewEvent = async (req, res, next) => {
  console.log("Creating new Event");
  let eventDate = new Date();

  let dateStr = eventDate.toString().split(" ");

  const [eventMonth, eventDay, eventYear] = [
    eventDate.getMonth(),
    eventDate.getDate(),
    eventDate.getFullYear(),
  ];


  const event = new Event({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    startTime: eventDate,
    date: eventDate,
    day: eventDay,
    month: eventMonth,
    year: eventYear,
  });

  try {
    const newevent = await event.save();
    res.status(201).json(newevent);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateNewEvent = async (req, res, next) => {
  var id = req.params.id;

  const eventUpdate = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    date: new Date.now(),
  };

  const eventUpdated = await Event.findByIdAndUpdate(id, eventUpdate);

  return res.status(200).json({
    eventUpdated,
  });
};

exports.deleteEvent = async (req, res, next) => {
  console.log("Delete event called");
  var id = req.params.id;
  const event = await Event.findByIdAndDelete(id);
  console.log(event);

  return res.status(200).json({
    message: "event deleted sucessfully",
    success: true,
  });
};
