const passport = require('passport')
const User = require('../Users/Model')

const { Strategy: GoogleStrategy } = require('passport-google-oauth20')
const { Strategy: TwitterStrategy } = require('passport-twitter')
//==> ==> ==> ==> Configure <== <== <== <==
// tell passport to use the credentials we have supplied in our .env file
passport.use(
	//==> ==> ==> ==> GOOGLE Strategy <== <== <== <==
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK
		},

		async (accessToken, refreshToken, profile, cb) => {
			try {
				const newUser = new User({
					name: profile.displayName,
					email: profile.emails[0].value,
					googleId: profile.id
				})
				const condition = { googleId: profile.id }

				const user = await User.findOneOrCreate(condition, newUser)
				return cb(null, user)
			} catch (error) {
				cb(error)
			}
		}
	)
)

passport.use(
	new TwitterStrategy(
		{
			consumerKey: process.env.TWITTER_CONSUMER_KEY,
			consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
			callbackURL: process.env.TWITTER_CALLBACK_URL
		},
		async (accessToken, refreshToken, profile, cb) => {
			// a user has logged in with OAuth...
			//look to see if we have a user that matches the profile.id
			try {
				const newUser = new User({
					name: profile.displayName,
					email: profile.email,
					twitterId: profile.id
				})

				condition = { twitterId: profile.id }

				const user = await User.findOneOrCreate(condition, newUser)
				return cb(null, user)
			} catch (error) {
				cb(error)
			}
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
