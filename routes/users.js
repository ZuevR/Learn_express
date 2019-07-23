const express = require("express");
const path = require("path");
const jwt = require('jsonwebtoken');
const response = require('../helpers/response');
const db = require('../db');
const router  = express.Router();

const pathPublic = path.join(process.cwd() + "/views");


/* GET users listing. */
router.get("/", function(req, res, next) {
  const token = req.headers.token || req.cookies.token;

  jwt.verify(token, 'inspirit', (err, decoded) => {
    if (decoded) {
      res.sendFile(pathPublic + "/users.html");
    } else {
      res.status(401).send(response.error('Please login'));
    }
  });
});

router.post("/", function(req, res, next) {});

router.get("/followers", async (req, res, next) => {
  const decoded = jwt.decode(req.headers.token);
  const userId = decoded.userId;
  try {
    const queryString = `SELECT "Users".name, "Users".id, "Followers".following FROM "Users" LEFT JOIN "Followers" ON "Users".id = "Followers".following WHERE "Users".id != $1`;
    const userValues = [userId];
    const users = await db.query(queryString, userValues);
    res.status(200).send(users.rows);
  } catch (e) {
    console.log(e);
  }
});

router.post("/follow", async (req, res, next) => {
  const token = req.headers.token;

  jwt.verify(token, 'inspirit', (err, decoded) => {
    if (decoded) {
      const userId = decoded.userId;
      const targetId = req.body.id;
      console.log(userId);
      console.log(targetId);
    } else {
      res.status(401).send(response.error('Please login'));
    }
  });
});

module.exports = router;
