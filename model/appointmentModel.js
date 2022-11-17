const mongoose = require("mongoose");
require("mongoose-type-email");
const appointmentSchema = new mongoose.Schema(
  {
    enquiryType: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: mongoose.SchemaTypes.Email,
      required: true,
    },
    enquiry: {
      type: String,
    },
    requestedDate: {
      type: String,
    },
  },
  { versionKey: false }
).set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Appointment", appointmentSchema);
