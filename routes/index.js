const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../Users/Model');

/* these are the index roues. */
router.get('/', (req, res, next) => {
  res.send('<h1>Welcome to our Home please log in.</h1>')
})

// ==> ==> ==> ==> Temporary Protected route <== <== <== <==
router.get('/home', (req, res, next) => {
  console.log('the user is : ', req.user)
  console.log('the session looks like this : ', req.session)
  res.send('<h1>Welcome back to the party!</h1>')
})


// ==> ==> ==> ==> Local auth routes <== <== <== <== 

// register as new user
router.post('/register', (req, res, next) => {
  // destructure fields from req.body
  const {
    firstName,
    lastName,
    username,
    email,
    password
  } = req.body

  // combine first/last names to single string based on current model format
  // TODO: Is there a more meaniful way to handle this? Perhaps a "profile" model for this info?

  const name = `${firstName} ${lastName}`

  User.create({
    username,
    name,
    email,
    password
  })
  .then(user => {
    req.login(user, err => {
      if(err) next(err)
      else res.redirect('/home')
    })
  })
  .catch(err => res.redirect('/failedloginattempt'))
})
// login route 

router.post('/auth/local', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/failedloginattempt',
  failureFlash: true
}))


// ==> ==> ==> ==> GOOGLE auth routes <== <== <== <== 
//login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
  ));
  

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/home',
    failureRedirect : '/failedloginattempt'
  }
  ));
  

// ==> ==> ==> ==> Twitter Routes <== <== <== <== 
//login route   
router.get('/auth/twitter', passport.authenticate('twitter'))

//oauth callback route
router.get('/auth/twitter/callback', passport.authenticate('twitter',
{
  successRedirect : '/user/profile',
  failureRedirect : '/failedloginattempt'
}
))


  // OAuth logout route
  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
  
  //temporary failed log in attempt 
  router.get('/failedloginattempt', (req, res) => {
    res.send('Authentication Failed please try again.')
  })
  
  module.exports = router;
  