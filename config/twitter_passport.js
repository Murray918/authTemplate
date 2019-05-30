const passport = require('passport')
const { Strategy: TwitterStrategy } = require('passport-twitter')
const User = require('../Users/Model')

//==> ==> ==> ==> Configure <== <== <== <==
// tell passport to use the credentials we have supplied in our .env file
passport.use(
	new TwitterStrategy ({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: process.env.TWITTER_CALLBACK_URL
      },
		async (accessToken, refreshToken, profile, cb) => {
			// a user has logged in with OAuth...
			//look to see if we have a user that matches the profile.id
			try {
				const  user = await User.findOne({ twitterId: profile.id })
				//if the user exists 
				if (!!user) { 
					return	cb(null, user) 
				} else {
					const newUser = new User({
						name: profile.displayName,
						email: profile.email,
						twitterId: profile.id
					})
				 await newUser.save()
					//execute the callback with the new User
					return cb(null, newUser)
				}
			} 
			catch(error) {
				cb(error)
			}
		})	
)
	
//serialize the User
passport.serializeUser(function(user, done) {
	done(null, user.id)
})

//deserialize the user
passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user)
	})
})
