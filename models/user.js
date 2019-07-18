const sequelize = require('../db/index');
const Sequelize = require('sequelize');

class User extends Sequelize.Model {}

User.init({
  id: {
    type: Sequelize.SMALLINT,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(30),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(30),
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING(60),
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATEONLY,
    defaultValue: Sequelize.NOW
  }
}, {
  sequelize: sequelize,
  modelName: 'User',
});

// User.create({
//   name: 'Jan',
//   email: 'ZuevRG@hyandex.ru',
//   password: 'a483233ce'
// });

// User.findOne({ where: {email: 'ZuevRG@yand.ru'} })
//     .then(user => console.log(user));

// sequelize.sync()
//     .then(() => User.create({
//       name: 'Roman',
//       email: 'ZuevRG@yandex.ru',
//       password: 'a483233ce'
//     }))
//     .then(jane => {
//       console.log(jane.toJSON());
//     });

module.exports = User;