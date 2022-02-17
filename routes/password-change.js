const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
  console.log(req.body)
  res.json({ status: 'ok', data: 'Email sent success'})
})


module.exports = router;