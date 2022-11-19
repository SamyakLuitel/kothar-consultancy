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
router.post("/", createNews);
router.put("/:id", updatedNews);
router.delete("/:id", deleteNews);

module.exports = router;
