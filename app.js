const express = require("express");
const mongoose = require("mongoose");

const app = new express();

let indexRouter = require('./routes/index');
let userRouter = require('./routes/user-route');
let phoneRouter = require('./routes/phone-route');
let loginRouter = require('./routes/login');
let pwdChangeRouter = require('./routes/password-change');
let adminRouter = require('./routes/admin');

// Connecting to the Database
let mongodb_url = 'mongodb://localhost/';
let dbName = 'estore';
mongoose.connect(mongodb_url + dbName,)
let db = mongoose.connection;

// Check Connection
db.once('open', ()=>{
   console.log('Database connected successfully')
})

// Check for DB Errors
db.on('error', (error)=>{
   console.log(error);
})

//Set view engine
app.set('view engine', 'ejs')

// Set a static folder
app.use(express.static('public'));

// body parser middleware
app.use(express.json())

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/phone', phoneRouter);
app.use('/login', loginRouter);
app.use('/passreset', pwdChangeRouter);
app.use('/admin', adminRouter);



const PORT = 8504;

app.listen(PORT, ()=>{
   console.log(`Server is listening on port ${PORT}`)
});

