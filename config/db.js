//TODO in this file we want to basically be able to switch the database based on a variable in the .env file. This variable is must be called DATABASE_TYPE. Ideally we would just export this file into the app.js and that is how you would set up the database. We will see how that goes. I am keeping this in Users for now however some of the logic might make sense to move into the config.

const connectToDb = dbVariable => {
  //==> ==> ==> ==> Mongoose <== <== <== <==
  if (dbVariable === "mongo") {
    // require the mongoose module
    const mongoose = require("mongoose")

    //connect to mongoose
    mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

    //print a message on connection
    mongoose.connection.on("connected", () =>
      console.log(`Mongoose connected to: ${process.env.DATABASE_URL}`)
    )
    module.exports = mongoose

    //==> ==> ==> ==> SQL <== <== <== <==
  } else if (dbVariable === "postgres") {
    const options = {
      query: e => {
        console.log(e.query)``
      }
    }

    const pgp = require("pg-promise")(options)

    module.exports = pgp(
      process.env.DATABASE_URL || "postgres://muhr:localhost:5432/noteapp"
    )
  }
}
//we can call this function with an environment variable that we can set in the .env file
connectToDb(process.env.DB_TYPE)
