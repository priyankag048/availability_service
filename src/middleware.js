'use strict';

const { BASIC_AUTH_USER, PASSWORD } = process.env;

const authentication = (req, res, next) => {
  const [username, password] = Buffer
    .from(req.headers.authorization.replace('Basic ', ''), 'base64')
    .toString()
    .split(':');
  if (username === Buffer.from(BASIC_AUTH_USER, 'base64').toString()
    && password === Buffer.from(PASSWORD, 'base64').toString()) {
    next();
  } else {
    res.status(401).json({ message: 'UNAUTHORIZED' });
  }
};

module.exports = authentication;
