const express = require("express")

const app = new express();

let indexRouter = require('./routes/index')

//Set view engine
app.set('view engine', 'ejs')

// Set a static folder
app.use(express.static('public'));

// body parser middleware
app.use(express.json())

app.use('/', indexRouter);



const PORT = 8504;

app.listen(PORT, ()=>{
   console.log(`Server is listening on port ${PORT}`)
});