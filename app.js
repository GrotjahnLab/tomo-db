require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const flash = require('express-flash-message');
const session = require('express-session');
const connectDB = require('./server/config/db');

const app = express();  
const port = 3000 || process.env.PORT;

// Connect to Database
connectDB();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));

//Static Files
app.use(express.static('public'));

// This flas message is giving me a very hard time --- Take a look into it later 


// Express Session
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        }
    })
);

// Templating Engine 
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', "ejs");

//Routes
app.use('/', require('./server/routes/experiment'))
app.use('/', require('./server/routes/samplePrep'))
app.use('/', require('./server/routes/leica'))
app.use('/', require('./server/routes/milling'))



//Handle 404
app.get('*', (req, res)=>{
    res.status(404).render('404');
})

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`)
});
