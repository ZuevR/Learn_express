var express = require("express");
var path = require("path");
var router = express.Router();

const pathPublic = path.join(process.cwd() + "/views");

router.get("/sign-in", (req, res) => {
  res.sendFile(pathPublic + "/sign-in.html");
});

router.get("/sign-up", (req, res) => {
  res.sendFile(pathPublic + "/sign-up.html");
});

module.exports = router;
