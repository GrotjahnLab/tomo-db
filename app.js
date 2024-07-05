require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const app = express();
const port = 3000 || process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Static Files
app.use(express.static('public'));

// Templating Engine 
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', "ejs");

// Home
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, ()=>{
    console.log('App listening on port ${port}')
});
