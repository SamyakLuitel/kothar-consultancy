const express = require("express");
const router = express.Router();
const {
  findAllUniversity,
  findOneUniversity,
  createNewUniversity,
  updateNewUniversity,
  deleteUniversity,
} = require("../controller/universityController");

//  university api
router.get("/", (req, res) => {
  res.send("done");
});

// //get all
router.get("/def", findAllUniversity);

// //get one
router.get("/:id", findOneUniversity);

// //creating one
router.post("/", createNewUniversity);

// updating one
router.put("/:id", updateNewUniversity);
// deleting one
router.delete("/:id", deleteUniversity);

router.post("/admin/University", (req, res) => {
  res.send("done ");
});

module.exports = router;
