const { Schema, model } = require('mongoose')


const userSchema = new Schema ({
    username: String,
    email: String,
    created_at : Date,
    avatar: String,
    googleId: String
  }, {
    timestamps: true
  });

  module.exports = model('User', userSchema);
