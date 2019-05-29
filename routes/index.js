const express = require('express');
const router = express.Router();
const passport = require('passport')

/* these are the index roues. */
router.get('/', (req, res, next) => {
  res.send('<h1>Welcome to our Home please log in.</h1>')
})

router.get('/home', (req, res, next) => {
  console.log('the user is : ', req.user)
  console.log('the session looks like this : ', req.session)
  res.send('<h1>Welcome back to the party!</h1>')
})

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/auth/twitter', passport.authenticate('twitter'))

router.get('/auth/twitter/callback', passport.authenticate('twitter',
{
  successRedirect : '/user/profile',
  failureRedirect : '/failedloginattempt'
}
))
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
