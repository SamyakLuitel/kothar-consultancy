const mongoose = require("mongoose");

const uniSchema = new mongoose.Schema(
  {
    destId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
    },
    image: {
      type: String,
    },
    name: {
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
