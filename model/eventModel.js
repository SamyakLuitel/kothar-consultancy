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
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { versionKey: false }
).set("toJSON", {
  virtuals: true,
});

module.export = mongoose.model("Event", eventSchema);
