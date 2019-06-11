const { Schema, model } = require('mongoose')
const bycrypt = require('bcrypt')

const userSchema = new Schema(
	{
		username: String,
		name: String,
		email: String,
		created_at: Date,
		avatar: String,
		googleId: String,
		twitterId: String,
		hashedpassword: String
	},
	{
		timestamps: true
	}
)

userSchema.methods.validPassword = (pw) => {
	return bycrypt.compareSync(pw, this.hashedpassword)
}

userSchema.virtual('password').set((val) => {
	this.hashedpassword = bycrypt.hashSync(val, 12)
})

userSchema.statics.findOrCreate = async function (condition, doc) {
	const self = this
	const newDocument = doc
	try {
		const found = await self.findOne(condition)
		if (!!found) {
			return found
		} else {
			const created = self.create(newDocument)
			return created
		}
	} catch (error) {
		console.error(error)
		return error

	}
}

module.exports = model('Users', userSchema)
