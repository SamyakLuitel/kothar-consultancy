const express = require("express");
const router = express.Router();
const {
  findAllService,
  findOneService,
  createNewService,
  updateNewService,
  deleteService,
} = require("../controller/serviceController");

//  services api
router.get("/", (req, res) => {
  res.send("done");
});

// //get all
router.get("/", findAllService);

// //get one
router.get("/:id", findOneService);

// //creating one
router.post("/", createNewService);

// updating one
router.put("/:id", updateNewService);
// deleting one
router.delete("/:id", deleteService);

router.post("/admin/service", (req, res) => {
  res.send("done ");
});

module.exports = router;
