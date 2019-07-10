const express = require("express");
const router = express.Router();
const path = require("path");

const pathPublic = path.join(process.cwd() + "/views");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.sendFile(pathPublic + "/index.html");
});

module.exports = router;
