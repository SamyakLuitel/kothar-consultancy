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


exports.findOneService = async (req, res, next) => {
    var id = req.params.id; // $_GET["id"]
    console.log(id)
    const service = await Service.findById(id);
    console.log(service)

    return res.status(200).json({
        service
    });
}



exports.createNewService = async (req, res, next) => {
    console.log("Creating new service")
    console.log(req.body)
    console.log(req.body.more.infos)
    const service = new Service({
        serviceName: req.body.name,
        descripttion: req.body.description,
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



exports.updateNewService = async (req, res, next) => {
    console.log("Update service called")
    var id = req.params.id; // $_GET["id"]
    const serviceUpdate = {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        what: req.body.what,
        who: req.body.who,
        more: req.body.more
    }
    const serviceUpdated = await Service.findByIdAndUpdate(id, serviceUpdate );
    console.log(serviceUpdated)

    return res.status(200).json({
        serviceUpdated
    });
}


exports.deleteService = async  (req, res, next) => {
    console.log("delete service called")
    var id = req.params.id; // $_GET["id"]
    const services = await  Service.findByIdAndDelete(id);
    console.log(id)

    return res.status(200).json({
        message: "service deleted sucessfully", 
        success: true
    });
}

