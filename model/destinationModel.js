const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    destination: {
      type: String,
      trim: true,
    },
    destinationDesc: {
      type: String,
    },
    whyDestination: {
      title: {
        type: String,
        trim: true,
      },
      ans: [
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

module.exports = mongoose.model("Destination", destinationSchema);
