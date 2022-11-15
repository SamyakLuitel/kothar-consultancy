const Service = require("../model/serviceModel")

//service controller 

exports.findAllService = async (req, res, next) => {
    try {
        const allServices = await Service.find();
        console.log("find all")
        const serviceData ={
            serviceMotto:"Provide awesome customer service with our experienced teachers",
            services:allServices,
            success:true, 
            message:"data fetched"
        }
        res.json(serviceData)
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
    console.log(req.body)
    console.log(req.body.more.infos)
    const service = new Service({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        what: req.body.what,
        who: req.body.who,
        more: req.body.more
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
    const services = Service.updateOne();
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

