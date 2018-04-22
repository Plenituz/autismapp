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
//routers
const LoginRouter = require('./routers/LoginRouter');
const DataRouter = require('./routers/DataRouter');
const Database = require('./services/Database');

const app = express();
app.enable('trust proxy');//for nginx compat

// app.use(favicon(path.join(__dirname, "public", "imgs", "favicon.png")));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
//must be after bodyParser
app.use(expressValidator());


passport.serializeUser(async (user_id, done) => {
    // let userInfo = await Database.getUserInfo(user_id);
    done(null, user_id);
});

passport.deserializeUser((userSession, done) => {
    done(null, userSession);
});

app.get('/', (req, res) =>{
    res.status(200).send('it works!');
});

app.use(LoginRouter);
app.use(DataRouter);

app.use((req, res, next) => {
    //in case the user asked for an unset page
    res.status(404).send('the page ' + req.url + ' doesn\'t exist');
});

var server = app.listen(parseInt(process.env.PORT), "127.0.0.1", 
    () => console.log("Server running on port 3000"));