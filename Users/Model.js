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


userSchema.statics.findOneOrCreate = function findOneOrCreate(condition, doc) {
	const self = this
	const newDocument = doc
	return new Promise((resolve, reject) => {
		return self
			.findOne(condition)
			.then(result => {
				if (result) {
					return resolve(result)
				}
				return self
					.create(newDocument)
					.then(result => {
						return resolve(result)
					})
					.catch(error => {
						return reject(error)
					})
			})
			.catch(error => {
				return reject(error)
			})
	})
}

module.exports = model('Users', userSchema)
