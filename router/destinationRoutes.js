const express = require("express");
const router = express.Router();
const {
  findAllDestination,
  findOneDestination,
  createNewDestination,
  updateDestination,
  deleteDestination,
} = require("../controller/destinationController");

//  findAllDestinations api
router.get("/", (req, res) => {
  res.send("done");
});

// get all
router.get("/", findAllDestination);

// get one
router.get("/:id", findOneDestination);

// creating one
router.post("/", createNewDestination);

// updating one
router.put("/:id", updateDestination);

// deleting one
router.delete("/:id", deleteDestination);

router.post("/admin/findAllDestination", (req, res) => {
  res.send("done ");
});

module.exports = router;
