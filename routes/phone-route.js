const express = require('express');
const router = express.Router();
const phone = require('../models/phones');
const bcrypt = require('bcryptjs');

router.post('/', (req, res) => {
  console.log(req.body)

  //const passhash = bcrypt.hash(req.body.pass, 10)
 // console.log(passhash)
  
  try {
    phone.create({
      name: req.body.name,
      price: req.body.price,
      color: req.body.color,
      stock: req.body.stock
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: 'email already in use' })
    }
    throw error
  }
})





module.exports = router;