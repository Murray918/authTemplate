const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')



//this is the users route
const users = require('./routes/users')

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
//set up body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//setup cookie parser
app.use(cookieParser())

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

app.use('/api/v1/users', users)

module.exports = app
