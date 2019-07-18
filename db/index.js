// const Sequelize = require('sequelize');
// const sequelize = new Sequelize({
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: '1111',
//   database: 'blog',
//   dialect: 'postgres',
//   define: {
//     timestamps: false
//   }
// });
//
// module.exports = sequelize;
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'blog',
  password: '1111',
  port: 5432,
});

module.exports = pool;

// client.connect();
//
// client.query('SELECT * FROM "Users" WHERE id = 4', (err, res) => {
//   console.log(res.rows);
//   client.end()
// });