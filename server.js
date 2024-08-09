require('dotenv').config(); //load in my .env variables 
const express = require('express');//bring in express to make our express app
const Todo = require('./models/todo.js'); //import the model called Todo (found in our /model/todo.js file)


const app = express();

//////////////////////////////////////////////
//////// Middles: Section          //////// 
///////////////////////////////////////////////
app.use(express.json());// this middleware allows us to send JSON in our request body
// any static files comes from this folder. 
// like images and css files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); //read form data from our ejs



//////////////////////////////////////////////
//////// Routes: Section          //////// 
///////////////////////////////////////////////


app.get('/todo', async (req, res) => {
    try {

        //this is the data from the mongo db
        let listOfThingsTodo = await Todo.find({});

        //render the show.ejs page. 
        // and PASS to show.ejs data. 
        //this data is { k: listOfThingsTodo }

        // we can put our console logs here. like so
        // console.log(listOfThingsTodo);
        res.render('show.ejs', { k: listOfThingsTodo });
    } catch (err) {
        res.status(400).json(err);
    }
});


app.post('/todo', async (req, res) => {
    try {
        //transform isComplete from string  to be a boolean 
        if(req.body.isComplete  === 'on'){
            req.body.isComplete = true;
        }else{
            req.body.isComplete = false;
        }

        //transform the duration from string to be number
        req.body.duration = Number(req.body.duration);
        //send this request body to the db save it and then im going to redirect to the home page
        await Todo.create(req.body); //add to the db
        res.redirect('/todo') //then redirect to the /todo
        
    } catch (err) {
        res.status(400).json(err);
    }
});


app.get('/todo/new', (req, res) => {
    res.render('new.ejs')
});


//have the express application running on our PORT 
app.listen(process.env.PORT, () => {
    console.log(`listening on port: ${process.env.PORT}`)
})