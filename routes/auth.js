const express = require("express");
const path = require("path");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const response = require('../helpers/response');
const router = express.Router();

const pathPublic = path.join(process.cwd() + "/views");

router.get("/sign-in", (req, res, next) => {
  res.sendFile(pathPublic + "/sign-in.html");
});

router.post("/sign-in", async (req, res, next) => {
  const formData = req.body;
  try {
    const rows = await db.query('SELECT * FROM users WHERE email = $1', [formData.email.toLowerCase()]);
    if (rows.rows.length) {
      const user = rows.rows[0];
      const match = await bcrypt.compare(formData.password, user.password);
      if (match) {
        const token = jwt.sign({
            userId: user.id,
            userName: user.name
          },
          'inspirit',
          {expiresIn: '24h'}
        );
        res.status(200).send(response.success({
          user: user.name,
          token
        }));
      } else {
        res.status(401).send(response.error('Wrong Password'));
      }
    } else {
      res.status(401).send(response.error('Wrong Email'));
    }
  } catch (error) {}
});

router.get("/sign-up", (req, res, next) => {
  res.sendFile(pathPublic + "/sign-up.html");
});

router.post("/sign-up", async (req, res, next) => {
  const formData = req.body;

  try {
    const rows = await db.query('SELECT * FROM users WHERE email = $1', [formData.email.toLowerCase()]);
    if (rows.rowCount) {
      res.status(409).send(response.error('User with this email already exist'));
    } else {
      const hashPassword = await bcrypt.hash(formData.password, 3);
      const queryString = 'INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING *';
      const userValues = [formData.name, formData.email.toLowerCase(), hashPassword];

      const userData = await db.query(queryString, userValues);
      const user = userData.rows[0];
      const token = jwt.sign({
          userId: user.id,
          userName: user.name
        },
        'inspirit',
        {expiresIn: '24h'}
      );

      res.status(201)
        .send(response.success({
          user: user.name,
          token
        }));
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", (req, res, next) => {
  res.sendFile(pathPublic + '/index.html');
});

module.exports = router;

//select u.id, u.name, f.following from users u left join followers f on u.id = f.following and f.follower = 6 where u.id != 6 and f.following is not null