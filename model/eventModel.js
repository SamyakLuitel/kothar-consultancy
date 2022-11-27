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
      type: String,
    },
    endTime: {
      type: String,
    },
    date: {
      type: Date,
    },
    day: {
      type: String,
    },
    month: {
      type: String,
    },
    year: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { versionKey: false }
).set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Event", eventSchema);
