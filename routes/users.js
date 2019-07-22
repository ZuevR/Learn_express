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
    const users = await db.query('SELECT "Users".name, "Users".id, "Followers".following FROM "Users" LEFT JOIN "Followers" ON "Users".id = "Followers".following WHERE name LIKE '%o%' and "Users".id != 4 RETURNING *');
    console.log(users);
  } catch (error) {

  }


  // console.log(userId);
});

module.exports = router;
