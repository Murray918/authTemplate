const { Schema, model } = require('mongoose')


const userSchema = new Schema ({
    username: String,
    name : String,
    email: String,
    created_at : Date,
    avatar: String,
    googleId: String,
    twitterId : String,
  }, {
    timestamps: true
  });

  module.exports = model('Users', userSchema);
