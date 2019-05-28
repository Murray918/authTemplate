const express = require('express');
const router = express.Router();

/* GET users listing. */
// router.all('*', isLoggedIn)

router.get('/profile', function(req, res, next) {
    console.log(req.session)
    console.log(req.isAuthenticated)
  res.json({users: [{name: req.user}]});
})

module.exports = router;
