const mongoose = require("mongoose");

const serviceModel = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      reqiuired: true,
    },
    descripttion: {
      type: String,
      required: true,
    },
    image: { type: String },
    what: {
      title: {
        type: String,
      },
      desc: {
        type: String,
      },
    },
    who: {
      titlle: {
        type: String,
      },
      desc: {
        type: String,
      },
    },
    more: {
      title: {
        type: String,
      },
      infos: [
        {
          title: {
            type: String,
          },
          desc: {
            type: String,
          },
        },
      ],
    },
  },
  { versionKey: false }
).set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Sevice", serviceModel);
