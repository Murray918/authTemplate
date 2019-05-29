const passport = require('passport')
const { Strategy: GoogleStrategy } = require('passport-google-oauth20')
const User = require('../Users/Model')

//==> ==> ==> ==> Configure <== <== <== <==
// tell passport to use the credentials we have supplied in our .env file
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK
		},
		async (accessToken, refreshToken, profile, cb) => {
			// a user has logged in with OAuth...
			//look to see if we have a user that matches the profile.id
			try {
				const  user = await User.findOne({ googleId: profile.id })
				//if the user exists 
				if (!!user) { 
				return	cb(null, user) 
				} else {
					const newUser = new User({
						name: profile.displayName,
						email: profile.emails[0].value,
						googleId: profile.id
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
