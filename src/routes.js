'use strict';

const express = require('express');
const router = express.Router();

const { ALLOW_DELETE } = process.env;
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'GET employees'
  });
});
router.post('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'POST employees'
  });
});

if (ALLOW_DELETE === 'true') {
  router.delete('/', (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'DELETE employees'
    });
  });
}


module.exports = router;
