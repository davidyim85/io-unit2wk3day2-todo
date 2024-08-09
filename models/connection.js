//////////////////////////////////////////////
//////// Database Connections          //////// 
///////////////////////////////////////////////
/*
this file is the connection settings file to our mongo database 
*/

require('dotenv').config();  //load in my .env variables 
const mongoose = require('mongoose'); //import mongoose


//establish the connection to the mongo db using the connection string
mongoose.connect(process.env.DBURL); 


//OPTIONAL LINES OF CODE: will checked the status of our connection to the db
mongoose.connection
    .on('open', () => console.log('connected'))
    .on('close', () => console.log('disconnected'))
    .on('error', (err) => console.log('error', err))


//export mongoose the VARIABLE with all its configurations above!
module.exports = mongoose;
