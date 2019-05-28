const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')

//this is the index routes
const index = require('./routes')
const users = require('./Users/routes')

//==> ==> ==> ==> CONFIGURATIONS <== <== <== <==
// load the env vars
require('dotenv').config()
//connect to mongodb
require('./config/database')
//configure passport
require('./config/passport')


//initialize express
const app = express()

// ==> ==> ==> ==>  Middleware <== <== <== <==
//set up body-parser for req.body
app.use(bodyParser.json())
//set up body parser for urls
app.use(bodyParser.urlencoded({ extended: false }))

//set up the cookie session
app.use(
	session({
		secret: 'wombat-french-matel-clams-tremble!',
		resave: false,
		saveUninitialized: true
	})
)
//initialize passport
app.use(passport.initialize());
//set passport to use sessions
app.use(passport.session())

app.use('/', index)
app.use('/users', users)  

app.use(function(req, res) {
    res.status(404).send('Cant find that!');
  });

module.exports = app
