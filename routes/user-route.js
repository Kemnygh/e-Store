const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

router.post('/', (req, res) => {
  console.log(req.body)

  // const passhash = bcrypt.hash(req.body.pass, 10)
  // console.log(passhash)
  
  try {
    User.create({
      first_name: req.body.fname,
      last_name: req.body.lname,
      email: req.body.email,
      password: req.body.pass,
      date: req.body.date
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: 'email already in use' })
    }
    throw error
  }
})





module.exports = router;