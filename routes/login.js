const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jst = 'I12OICdpcOAPAoe0PffL*^&G6EmFY3KR!mgJ1ufnEdH4-/8cvsZ8aS1ynWiL52Hkw2*$n81Z1n7xrrg1HHY61ZrK'

router.post('/', (req, res) => {
  
  console.log(req.body)
  const {email, pass} = req.body
 

    User.findOne({ email }, (error,user) => {
      // console.log(user)
      try {
        bcrypt.compare(pass, user.password, function (error, isMatch) {
          if (error) {
            throw error
          } else if (!isMatch) {
            console.log("Password doesn't match!")
            res.json({status: 'error', error: 'Invalid email/password'})
          } else {

            const token = jwt.sign({
              id: user._id,
              username: user.first_name
            },
              jst
            )
            console.log("Password matches!")
            res.json({ status: 'ok', data: token})
          }
        })
      } catch (err) {
        console.log('problem')
        res.json({status: 'error', error: 'Invalid email/password'})
      }
    })
  
})



module.exports = router;