const express = require('express');
const router = express.Router();
const passport = require('passport')

/* these are the index roues. */

router.all()

router.get('/', (req, res, next) => {
  res.send('<h1>Welcome to our Home please log in.</h1>')
})

router.get('/home', (req, res, next) => {
  console.log('the user is : ', req.user)
  console.log('the session lookls like this : ', req.session)
  res.send('<h1>Welcome back to the party!</h1>')
})


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

 // OAuth logout route
 router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


module.exports = router;
