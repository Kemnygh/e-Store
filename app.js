const express = require("express")

const app = new express();

//Set view engine
app.set('view engine', 'ejs')

// Set a static folder
app.use(express.static('public'));

// body parser middleware
app.use(express.json())


app.get('/',(req,res)=>{
  res.setHeader("content-type","text/html")
  res.send('<h1>This is the home page</h1>')
})


const PORT = 8504;

app.listen(PORT, ()=>{
   console.log(`Server is listening on port ${PORT}`)
});