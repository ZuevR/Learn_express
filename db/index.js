const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1111',
  database: 'blog',
  dialect: 'postgres',
  define: {
    timestamps: false
  }
});

module.exports = sequelize;


