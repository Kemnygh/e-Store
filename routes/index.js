const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
  // res.setHeader("content-type","text/html")
  // res.send('<h1>This is the home page</h1>')
  res.render('index')
})

module.exports = router;