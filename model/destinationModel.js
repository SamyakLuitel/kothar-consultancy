const mongoose = require('mongoose')

const destnationSchema = new mongoose.Schema({
    desitantion: {
        type: String, trim: true

    },
    desc: {
        type: String
    },
    whyDestination: [
        {
            title: {
                type: String,
                trim: true
            },
            ans: [
                {
                    ansTitle: {
                        type: String
                    },
                    ansDesc: {
                        type: String
                    }
                }
            ]
        }
    ]
})


module.exports = mongoose.model("Destination", destnationSchema)