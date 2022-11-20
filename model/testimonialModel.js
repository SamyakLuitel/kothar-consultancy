const mongoose = require("mongoose");

const tesimonialsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    tetimonial: {
      type: String,
      required: [true, "Please enter testimonial"],
    },
    image: {
      type: String,
      required: [true, "please enter image url"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
).set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Testimonal", tesimonialsSchema);
