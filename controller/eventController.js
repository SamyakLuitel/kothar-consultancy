const Event = require("../model/eventModel");
const { uploader } = require("../utils/imageUploadUtils");

//event controller

exports.findAllEvent = async (req, res, next) => {
  try {
    const eventData = await Event.find();
    console.log("find all");
    const allEvent = {
      events: eventData,
      success: true,
      message: "data fetched",
    };
    res.json(allEvent);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.findOneEvent = async (req, res, next) => {
  try {
    var id = req.params.id;
    const event = await Event.findById(id);
    console.log(event);

    return res.status(200).json({
      event,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
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

  try {
    const img = req.body.image;

    const uploadRes = uploader(img);
    const event = new Event({
      name: req.body.name,
      description: req.body.description,
      image: (await uploadRes).file,
      location: req.body.location,
      topic: req.body.topic,
      image: req.body.image,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      date: eventDate,
      day: eventDay,
      month: eventMonth + 1,
      year: eventYear,
    });

    const newevent = await event.save();
    res.status(201).json(newevent);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateNewEvent = async (req, res, next) => {
  var id = req.params.id;
  var img = req.body.image

  var  eventUpdate = {
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
    topic: req.body.topic,
    image: req.body.image,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    day: eventDay,
    month: eventMonth + 1,
    year: eventYear,
  };

  
  if (!(typeof img === 'undefined')) {
    if (img != null) {
      const uploadRes = uploader(img);
      let updatedImage = (await uploadRes).file


      eventUpdate = {
        name: req.body.name,
        description: req.body.description,
        date: new Date.now(),
        image: updatedImage,
      };
  
    }
  }

  const eventUpdated = await Event.findByIdAndUpdate(id, eventUpdate);

  return res.status(200).json({
    eventUpdated,
  });
};

exports.deleteEvent = async (req, res, next) => {
  try {
    console.log("Delete event called");
    var id = req.params.id;
    const event = await Event.findByIdAndDelete(id);
    console.log(event);

    return res.status(200).json({
      message: "event deleted successfully",
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
