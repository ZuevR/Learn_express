const express = require("express");
const router = express.Router();
const path = require("path");
const jwt = require('jsonwebtoken');
const db = require('../db');
const response = require('../helpers/response');

const pathPublic = path.join(process.cwd() + "/views");

router.get('/', async (req, res, next) => {
  const posts = await db.query(`select p.id, p.title, p.text, p.date, u.name from posts p left join users u on p.author_id = u.id order by p.date desc;`);
  res.status(200).send(posts.rows);
});

router.get('/create', function (req, res, next) {
  const token = req.headers.token || req.cookies.token;

  jwt.verify(token, 'inspirit', (err, decoded) => {
    if (decoded) {
      res.sendFile(pathPublic + "/posts-create.html");
    } else {
      res.status(401).send(response.error('Please login'));
    }
  });
});

router.post('/create', (req, res, next) => {

  const token = req.headers.token;
  jwt.verify(token, 'inspirit', async (err, decoded) => {
    if (decoded) {
      const userId = decoded.userId;
      const title = req.body.title;
      const text = req.body.text;
      const queryString = `insert into posts (title, text, author_id, date) values ($1, $2, $3, $4);`;
      const values = [title, text, userId, Date.now()];
      await db.query(queryString, values);
      res.status(201).send({message: 'ok'});
    } else {
      res.status(401).send(response.error('Please login'));
    }
  });

});


module.exports = router;