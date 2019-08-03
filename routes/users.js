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
    const queryString = `select u.id, u.name, f.follower from users u left join followers f on u.id = f.following and f.follower = $1 where u.id <> $1 order by u.name`;
    const userValues = [userId];
    const users = await db.query(queryString, userValues);
    console.log(users.rows);
    res.status(200).send({payload:users.rows, userId});
  } catch (e) {
    console.log(e);
  }
});

router.post("/follow", async (req, res, next) => {
  const token = req.headers.token;

  jwt.verify(token, 'inspirit', async (err, decoded) => {
    if (decoded) {
      const userId = decoded.userId;
      const targetId = req.body.id;

      const queryString = `SELECT * FROM followers WHERE follower = $1 AND following = $2`;
      const values = [userId, targetId];
      let follower = await db.query(queryString, values);
      if (follower.rowCount) {
        const queryString = `DELETE FROM followers WHERE follower = $1 AND following = $2`;
        await db.query(queryString, values);
        res.status(202).send({message: 'deleted'});
      } else {
        const queryString = `INSERT INTO followers (follower, following) VALUES ($1, $2)`;
        await db.query(queryString, values);
        res.status(201).send({message: 'created'});
      }

    } else {
      res.status(401).send(response.error('Please login'));
    }
  });
});

router.post('/search', async (req, res, next) => {
  const decoded = await jwt.decode(req.headers.token);
  const userId = decoded.userId;
  const keyWord = `%${req.body.keyWord}%`;
  try {
    const queryString = `select u.id, u.name, f.follower from users u left join followers f on u.id = f.following and f.follower = $1 where u.name ilike $2 and u.id != $1 order by u.name`;
    const userValues = [userId, keyWord];
    const users = await db.query(queryString, userValues);
    console.log(users.rows);
    res.status(200).send({payload:users.rows, userId});
  } catch (e) {
    console.log(e);
  }

});

module.exports = router;
