const Service = require("../model/serviceModel")

//service controller 

exports.findAllService = async (req, res, next) => {
    try {
        const services = await Service.find();
        console.log("find all")
        res.json(services)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}


exports.findOneService = (req, res, next) => {
    const services = Service.find();
    console.log(services)

    return res.status(200).json({
        done: "one"
    });
}



exports.createNewService = async (req, res, next) => {
    console.log("Creating new service")
    const service = new Service({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image
    })

    try {
        const newService = await service.save()
        res.status(201).json(newService);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}



exports.updateNewService = (req, res, next) => {
    const services = Service.find();
    console.log(services)

    return res.status(200).json({
        done: "iupdate "
    });
}


exports.deleteService = (req, res, next) => {
    const services = Service.find();
    console.log(services)

    return res.status(200).json({
        done: "delete"
    });
}

