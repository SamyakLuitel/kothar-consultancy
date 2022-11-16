const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
    },
    topic: {
      type: String,
    },
    image: {
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

module.exports = mongoose.model("News", newsSchema);
