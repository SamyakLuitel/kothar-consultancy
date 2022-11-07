const Destination = require("../model/destinationModel")

//destination controller 

exports.findAllDestination = async (req, res, next) => {
    try {
        const destination = await Destination.find();
        console.log("find all")
        res.json(destination)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}


exports.findOneDestination = (req, res, next) => {
    const destination = Destination.find();
    console.log(destination)

    return res.status(200).json({
        done: "one"
    });
}



exports.createNewDestination = async (req, res, next) => {
    console.log("Creating new Destination")
    const Destination = new Destination({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image
    })

    try {
        const newDestination = await Destination.save()
        res.status(201).json(newDestination);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}



exports.updateDestination = (req, res, next) => {
    const destination = Destination.find();
    console.log(destination)

    return res.status(200).json({
        done: "update "
    });
}


exports.deleteDestination = (req, res, next) => {
    const destination = Destination.find();
    console.log(destination)

    return res.status(200).json({
        done: "delete"
    });
}

