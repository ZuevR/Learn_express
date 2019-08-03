const express = require("express");
const router = express.Router();
const path = require("path");
const jwt = require('jsonwebtoken');
const db = require('../db');
const response = require('../helpers/response');

const pathPublic = path.join(process.cwd() + "/views");

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.sendFile(pathPublic + "/index.html");
});

router.get('/check-user', (req, res, next) => {
  const token = req.headers.token;
  jwt.verify(token, 'inspirit', (err, decoded) => {
    if (decoded) {
      res.status(200).send(decoded.userName);
    } else {
      res.status(401).send(response.error('Please login'));
    }
  });

});
module.exports = router;
