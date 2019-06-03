const { Schema, model } = require('mongoose')

const userSchema = new Schema(
	{
		username: String,
		name: String,
		email: String,
		created_at: Date,
		avatar: String,
		googleId: String,
		twitterId: String
	},
	{
		timestamps: true
	}
)

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
