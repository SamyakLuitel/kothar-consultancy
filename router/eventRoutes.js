const express = require("express");
const router = express.Router();
const {
  findAllEvent,
  findOneEvent,
  createNewEvent,
  updateNewEvent,
  deleteEvent,
} = require("../controller/eventController");

//  Events api
router.get("/", (req, res) => {
  res.send("done");
});

// //get all
router.get("/def", findAllEvent);

// //get one
router.get("/:id", findOneEvent);

// //creating one
router.post("/", createNewEvent);

// updating one
router.put("/:id", updateNewEvent);
// deleting one
router.delete("/:id", deleteEvent);

router.post("/admin/Event", (req, res) => {
  res.send("done ");
});

module.exports = router;
