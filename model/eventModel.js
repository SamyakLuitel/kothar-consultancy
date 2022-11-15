const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
    },
    location: {
      type: String,
    },
    image: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false }
).set("toJSON", {
  virtuals: true,
});

module.export = mongoose.model("Event", eventSchema);
