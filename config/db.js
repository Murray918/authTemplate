/*
 * This is the database connection config. 
 * You must set a variable in the .env of DB_TYPE
 * connectToDb is a function that connects to the database of  choice
 * @ param dbVariable : String Which database to connect to
 * It will then export the database as a module
 */

const connectToDb = dbVariable => {
	//***************** Mongoose ***************/ 
	if (dbVariable === 'mongo') {
		// require the mongoose module
		const mongoose = require('mongoose')

		//connect to mongoose
		mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

		//print a message on connection
		mongoose.connection.on('connected', () =>
			console.log(`Mongoose connected to: ${process.env.DATABASE_URL}`)
		)
		module.exports = mongoose

	} else if (dbVariable === 'postgres') {
		//************** Postgres ***************/
		const options = {
			query: e => {
				console.log(e.query)
				``
			}
		}
		//compose our database connection
		const pgp = require('pg-promise')(options)
	
    module.exports = pgp(
      process.env.DATABASE_URL || "postgres://muhr:localhost:5432/auth-template"
    )
	}
}

connectToDb(process.env.DB_TYPE)
