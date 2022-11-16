const express = require("express");
const router = express.Router();
const {
  findAllAppiontment,
  findOneAppointment,
  createNewAppointment,
  deleteAppointment,
  updateAppointment,
} = require("../controller/appointmentController");

router.get("/", findAllAppiontment);
router.get("/:id", findOneAppointment);
router.post("/", createNewAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

module.exports = router;
