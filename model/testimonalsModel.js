const mongoose = require('mongoose')

const tesimonialsSchema = new mongoose.Mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"]
    },
    testimonial: {
        type: String,
        required: [true, "Please enter testimonial"]
    },
    imageURL: {
        type: String,
        required: [true, "please enter image url"]
    }, createdAr: {
        type: Date,
        default: Date.now
    }
})

module.export = mongoose.model("Testimonal", tesimonialsSchema);