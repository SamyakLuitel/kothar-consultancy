const mongoose = require("mongoose");

const uniSchema = new mongoose.Schema(
  {
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
    },
    image: {
      type: String,
    },
    website: {
      type: String,
    },
  },
  { versionKey: false }
).set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("University", uniSchema);
