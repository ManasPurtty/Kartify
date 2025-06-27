const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');


//for env variable
require("dotenv").config();
// Database connection
require('./config/mongoose-connection');

// Routers
const productRouter = require('./routes/productRouter');
const ownerRouter = require('./routes/ownerRouter');
const userRouter = require('./routes/userRouter');
const indexRouter = require('./routes/index');

const db=require("./config/mongoose-connection");

// Middleware setup
app.use(express.json()); // Required for JSON body parsing
app.use(express.urlencoded({ extended: true })); // For form submissions
app.use(cookieParser());

const flash = require('connect-flash');
const session = require('express-session');

app.use(session({
  secret:  process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(flash());




app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");



// Routes
app.use('/products', productRouter);
app.use('/owners', ownerRouter);
app.use('/users', userRouter);
app.use('/', indexRouter);

// Server start
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
