const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const passport = require('passport');
//const cron = require("node-cron");
const publicDir = require('path').join(__dirname, 'public');
const router = express.Router();
const engine = require('ejs');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();
//require('./passport/local-auth');


/*
//Connecting to db TO MY LOCAL
mongoose.connect('mongodb://localhost/BCHPEDB', {useNewUrlParser: true});
mongoose.connection
.once('open', () => console.log('Local DB is connected'))
.on('error',err => console.log('Your', err));
*/

//DB to Atlas Mongodb
mongoose.connect('mongodb+srv://root:root@clustertest-rnhw7.mongodb.net/BCHPEDB?retryWrites=true&w=majority', {useNewUrlParser: true});
mongoose.connection
.once('open', () => console.log('Atlas PROD DB is connected'))
.on('error',err => console.log('Your', err));


// Importing routes
const indexRoutes = require('./routes/index');

//New added to use CRON job
const Jobs = require('./models/jobs');


// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.static(publicDir));


app.use(session({
  secret: 'mysecretsession',
  resave: false,
  saveUninitialized: false

}));
app.use(flash()); // to change between pages
app.use(passport.initialize());
app.use(passport.session());


app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});


//routes
app.use('/', indexRoutes);


// FAVICON MIDDLEWARE
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})


// CRON JOBS EXAMPLE
/*
cron.schedule('  * * * * *', () => {

    console.log("Mostrar");
    //Jobs.find({position: "PANADERO"});
    console.log(Jobs.find({position: "PANADERO"}));  
  });
*/



