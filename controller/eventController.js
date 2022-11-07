const Event = require("../model/eventModel")

//event controller 

exports.findAllEvent = async (req, res, next) => {
    try {
        const event = await Event.find();
        console.log("find all")
        res.json(event)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}


exports.findOneEvent = (req, res, next) => {
    const event = Event.find();
    console.log(event)

    return res.status(200).json({
        done: "one"
    });
}



exports.createNewEvent = async (req, res, next) => {
    console.log("Creating new Event")
    const Event = new Event({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image
    })

    try {
        const newevent = await Event.save()
        res.status(201).json(newevent);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}



exports.updateNewEvent = (req, res, next) => {
    const event = Event.find();
    console.log(event)

    return res.status(200).json({
        done: "update "
    });
}


exports.deleteEvent = (req, res, next) => {
    const event = Event.find();
    console.log(event)

    return res.status(200).json({
        done: "delete"
    });
}

