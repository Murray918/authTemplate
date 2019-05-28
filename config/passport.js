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
		(accessToken, refreshToken, profile, cb) => {
			// a user has logged in with OAuth...
			//look to see if we have a user that matches the profile.id
			User.findOne({ googleId: profile.id }, (error, user) => {
				//if there is an error execute callback with error
				if (error) return cb(error)
				//if mongoose returns a user set the error to null and execute the callback with the     returned User
				if (user) {
					return cb(null, user)
				} else {
					// we have a new User via OAuth!
					const newUser = new User({
						name: profile.displayName,
						email: profile.emails[0].value,
						googleId: profile.id
					})
					//save the new user if there is no errors
					newUser
						.save()
						//execute the callback with the new User
						.then(newUser => {
							console.log('newUser', newUser)
							cb(null, newUser)
						})
						.catch(error => {
							console.log(error)
							cb(error)
						})
				}
			})
		}
	)
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
