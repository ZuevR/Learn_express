const path = require('path');

const pathPublic = path.join(process.cwd() + '/views');

const getPage = (uri) => (req, res) => {
  res.sendFile(path.join(pathPublic, uri));
};

module.exports = {
  getPage
};