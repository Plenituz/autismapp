require('dotenv').config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
//auth
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const MySQLStore = require('express-mysql-session')(session);


const app = express();
app.enable('trust proxy');//for nginx compat

app.use(favicon(path.join(__dirname, "public", "imgs", "favicon.png")));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(session({
    secret : 'efg75zr8g8zregt738z3rz7r4gz35fgs.FSgs$$sfg$sfg$',
    proxy : true,
    resave : false,
    saveUninitialized : false,
    store : new MySQLStore({
        host : 'localhost',
        user : 'root',
        password : '',
        database : 'autism_app'
    }),
    cookie: { secure : true } // put true here if we use HTTPS
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
//must be after bodyParser
app.use(expressValidator());

passport.serializeUser((user_id, done) => {
    // db.getUserInfo(user_id)
    // .spread(function(name, email){
    //     var userSession = {
    //         user_id : user_id,
    //         name : name,
    //         email : email
    //     };
    //     done(null, userSession);
    // });
});

passport.deserializeUser((userSession, done) => {
    done(null, userSession);
});

app.get('/', (req, res) =>{
    res.status(200).send('it works!');
});

var server = app.listen(3000, "127.0.0.1", 
    () => console.log("Server running on port 3000"));