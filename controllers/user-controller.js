const db = require('../db');
const helper = require('../helpers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getIdentity = (req, res) => {
  res.status(200).send({userName: req._userName});
};

const signIn = async (req, res) => {
  const formData = req.body;
  const email = formData.email.toLowerCase();
  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length) {
      const user = result.rows[0];
      const match = await bcrypt.compare(formData.password, user.password);
      if (match) {
        const token = jwt.sign({
            userId: user.id,
            userName: user.name
          },
          'inspirit',
          {expiresIn: '24h'}
        );
        res.status(200).send(helper.success({
          user: user.name,
          token
        }));
      } else {
        res.status(401).send(helper.error('Wrong Password'));
      }
    } else {
      res.status(401).send(helper.error('Wrong Email'));
    }
  } catch (error) {
    console.log(error);
  }
};

const signUp = async (req, res) => {
  const formData = req.body;
  const email = formData.email.toLowerCase();
  const name = formData.name;
  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rowCount) {
      res.status(409).send(helper.error('User with this email already exist'));
    } else {
      const hashPassword = await bcrypt.hash(formData.password, 3);
      const queryString = 'INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING *';
      const userValues = [name, email, hashPassword];

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
        .send(helper.success({
          user: user.name,
          token
        }));
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const userId = req._userId;
    const queryString = `select u.id, u.name, f.follower
                         from users u
                                  left join followers f on u.id = f.following
                             and f.follower = $1
                         where u.id <> $1
                         order by u.name`;
    const userValues = [userId];
    const users = await db.query(queryString, userValues);
    res.status(200).send({payload: users.rows, userId});
  } catch (e) {
    console.log(e);
  }
};

const toggleFollow = async (req, res) => {
  try {
    const userId = req._userId;
    const targetId = req.body.id;
    const queryString = `SELECT *
                       FROM followers
                       WHERE follower = $1
                         AND following = $2`;
    const values = [userId, targetId];
    const follower = await db.query(queryString, values);
    if (follower.rowCount) {
      const queryString = `DELETE
                         FROM followers
                         WHERE follower = $1
                           AND following = $2`;
      await db.query(queryString, values);
      res.status(202).send({message: 'deleted'});
    } else {
      const queryString = `INSERT INTO followers (follower, following)
                         VALUES ($1, $2)`;
      await db.query(queryString, values);
      res.status(201).send({message: 'created'});
    }
  } catch (error) {
    console.log(error);
  }

};

const search = async (req, res) => {
  const userId = req._userId;
  const keyWord = `%${req.body.keyWord}%`;
  try {
    const queryString = `select u.id, u.name, f.follower
                         from users u
                                  left join followers f on u.id = f.following and f.follower = $1
                         where u.name ilike $2
                           and u.id != $1
                         order by u.name`;
    const userValues = [userId, keyWord];
    const users = await db.query(queryString, userValues);
    res.status(200).send({payload: users.rows, userId});
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getIdentity,
  signIn,
  signUp,
  getAllUsers,
  toggleFollow,
  search
};