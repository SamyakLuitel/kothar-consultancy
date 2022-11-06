const mongoose = require("mongoose");

const serviceModel = new mongoose.Schema({
    name: {
        type: String,
        reqiuired: true
    },
    description: {
        type: String,
        required: true
    },
    image: { type: String }
    ,
    what: {
        title: {
            type: String
        },
        desc: {
            type: String
        }
    },
    who: {
        title: {
            type: String
        },
        desc: {
            type: String
        }
    },
    more: {
        title: {
            type: String
        },
        infos: [{
            title: {
                type: String
            },
            desc: {
                type: String
            }
        }]
    }
})


module.exports = mongoose.model("Sevice", serviceModel);
