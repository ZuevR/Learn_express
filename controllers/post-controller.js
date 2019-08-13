const db = require('../db');
const path = require('path');

const pathPublic = path.join(process.cwd() + '/views');

const getPosts = async (req, res) => {
  try {
    const posts = await db.query(`select p.id, p.title, p.text, to_char(p.date, 'dd Mon, yyyy') as date, u.name
                                from posts p
                                         left join users u on p.author_id = u.id
                                order by p.date desc;`);
    res.status(200).send(posts.rows);
  } catch (error) {
    console.log(error);
  }
};

const getPostCreatePage = (req, res) => {
  res.sendFile(pathPublic + '/posts-create.html');
};

const createPost = async (req, res) => {
  try {
    const userId = req._userId;
    const title = req.body.title;
    const text = req.body.text;
    const queryString = `insert into posts (title, text, author_id)
                       values ($1, $2, $3);`;
    const values = [title, text, userId];
    await db.query(queryString, values);
    res.status(201).send({message: 'ok'});
  } catch (error) {
    console.log(error);
  }

};

const getFriendsPostsPage = (req, res) => {
  res.sendFile(pathPublic + '/friends-posts.html');
};

const getFriendsPosts = async (req, res) => {
  try {
    const userId = req._userId;
    const queryString = `select p.id, p.title, p.text, to_char(p.date, 'dd Mon, yyyy') as date, u.name
                         from posts p
                                  right join users u on p.author_id = u.id
                         where u.id in (select following from followers where follower = $1)
                           and p.author_id is not null`;
    const values = [userId];
    const posts = await db.query(queryString, values);
    console.log(posts.rows);
    res.send(posts.rows);
  } catch (error) {
    console.log(error);
  }
};

const getMyPostsPage = (req, res) => {
  res.sendFile(pathPublic + '/my-posts.html');
};

const getMyPosts = async (req, res) => {
  try {
    const userId = req._userId;
    const queryString = `select id, title, text, author_id, to_char(date, 'dd Mon, yyyy') as date
                         from posts
                         where author_id = $1`;
    const values = [userId];
    const posts = await db.query(queryString, values);
    res.send(posts.rows);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPosts,
  getPostCreatePage,
  createPost,
  getFriendsPostsPage,
  getFriendsPosts,
  getMyPostsPage,
  getMyPosts
};