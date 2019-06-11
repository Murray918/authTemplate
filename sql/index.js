const { QueryFile } = require("pg-promise")
const { path } = require("path")

module.exports = {
  // here we can use SQL files to generate our methods for users
  users: {
    create: sql("Users/create.sql"),
    find: sql("Users/find.sql"),
    empty: sql("Users/empty.sql"),
    init: sql("Users/init.sql"),
    drop: sql("Users/drop.sql"),
    add: sql("Users/add.sql")
  }
}

function sql(file) {
  const fullPath = path.join(__dirname, file) // generating full path;

  const options = {
    // minifying the SQL is always advised;
    // see also option 'compress' in the API;
    minify: true,

    // Showing how to use static pre-formatting parameters -
    // we have variable 'schema' in each SQL (as an example);
    params: {
      schema: "users" // replace ${schema~} with "users"
    }
  }
  const qf = new QueryFile(fullPath, options)

  if (qf.error) {
    // Something is wrong with our query file :(
    // Testing all files through queries can be cumbersome,
    // so we also report it here, while loading the module:
    console.error(qf.error)
  }

  return qf

  // See QueryFile API:
  // http://vitaly-t.github.io/pg-promise/QueryFile.html
}
