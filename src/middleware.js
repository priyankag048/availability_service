'use strict';

const { BASIC_AUTH_USER, PASSWORD } = process.env;

const authentication = (req, res, next) => {
  const [username, password] = Buffer
    .from(req.headers.authorization.replace('Basic ', ''), 'base64')
    .toString()
    .split(':');
  if (username === BASIC_AUTH_USER && password === PASSWORD) {
    next();
  } else {
    res.status(401).json({ message: 'UNAUTHORIZED' });
  }
};

module.exports = authentication;
