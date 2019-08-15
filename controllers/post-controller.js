const db = require('../db');

const getPosts = async (req, res) => {
  try {
    const posts = await db.query(`select p.id, p.title, p.text, date_part('epoch', p.date)::int as date, u.name
                                  from posts p
                                           left join users u on p.author_id = u.id
                                  order by p.date desc;`);
    console.log(posts.rows);
    res.status(200).send(posts.rows);
  } catch (error) {
    console.log(error);
  }
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

const getFriendsPosts = async (req, res) => {
  try {
    const userId = req._userId;
    const queryString = `select p.id, p.title, p.text, date_part('epoch', p.date)::int as date, u.name
                         from posts p
                                  right join users u on p.author_id = u.id
                         where u.id in (select following from followers where follower = $1)
                           and p.author_id is not null
                         order by date desc`;
    const values = [userId];
    const posts = await db.query(queryString, values);
    res.send(posts.rows);
  } catch (error) {
    console.log(error);
  }
};

const getMyPosts = async (req, res) => {
  try {
    const userId = req._userId;
    const queryString = `select id, title, text, author_id, date_part('epoch', date)::int as date
                         from posts
                         where author_id = $1
                         order by date desc`;
    const values = [userId];
    const posts = await db.query(queryString, values);
    res.send(posts.rows);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPosts,
  createPost,
  getFriendsPosts,
  getMyPosts
};