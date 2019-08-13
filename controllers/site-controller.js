const path = require('path');

const pathPublic = path.join(process.cwd() + '/views');

const getHomePage = (req, res) => {
  res.sendFile(pathPublic + '/index.html');
};

const getIdentity = (req, res) => {
  res.status(200).send({userName: req._userName});
};

module.exports = {
  getHomePage,
  getIdentity
};