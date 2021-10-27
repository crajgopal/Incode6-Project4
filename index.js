const express = require('express') // import express package
const app = new express() //create instance of express app, init app

const path =require('path');

const homeRouter =require('./routes/home')
//const db = require('./database')

//load view engine
app.set('views',path.join(__dirname, 'views') );
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname +'/public')));

const moragn = require('morgan')// http request logger middleware for node.js

app.use (express.json())//allows to handle raw json
app.use(express.urlencoded({extended:true}))//middleware to get req body.

//Routes
app.use('/', homeRouter)





const PORT = process.env.PORT||3000;

app.listen(PORT, ()=>console.log(`Server started at ${PORT}`));

