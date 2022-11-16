const express = require("express");
const router = express.Router();
const {
  findOneNews,
  findAllNews,
  updatedNews,
  createNews,
  deleteNews,
} = require("../controller/newsController");

router.get("/", findAllNews);
router.get("/:id", findOneNews);
router.put("/", updatedNews);
router.put("/:id", createNews);
router.delete("/", deleteNews);

module.exports = router;
