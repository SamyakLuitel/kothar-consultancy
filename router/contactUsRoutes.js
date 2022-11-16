const express = require("express");
const router = express.Router();
const { sendEmail } = require("../controller/contactUsController");

router.post("/", sendEmail);

module.exports = router;
