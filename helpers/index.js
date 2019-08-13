const jwt = require('jsonwebtoken');

const error = message => ({
  message
});

const success = data => ({
  message: 'OK',
  payload: data
});

const verifyToken = (req, res, next) => {
  const token = req.headers.token || req.cookies.token;

  jwt.verify(token, 'inspirit', (err, decoded) => {
    if (decoded) {
      req._userId = decoded.userId;
      req._userName = decoded.userName;
      next();
    } else {
      res.status(401).send(error('Please login'));
    }
  });
};

module.exports = {
  verifyToken,
  error,
  success
};