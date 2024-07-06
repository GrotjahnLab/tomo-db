require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const connectDB = require('./server/config/db');

const app = express();
const port = 3000 || process.env.PORT;

// Connect to Database
connectDB();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Static Files
app.use(express.static('public'));

// Templating Engine 
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', "ejs");

//Routes
app.use('/', require('./server/routes/experiment'))



//Handle 404
app.get('*', (req, res)=>{
    res.status(404).render('404');
})

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`)
});
