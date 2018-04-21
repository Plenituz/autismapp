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