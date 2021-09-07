'use strict';

const express = require('express');
const routes = require('./routes');
const authentication = require('./middleware');

const app = express();
const PORT = 4005;

app.use(express.json());
app.use(authentication);
app.use('/api/v1/employees', routes);

const server = app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});

module.exports = server;
