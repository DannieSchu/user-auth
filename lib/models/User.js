const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  }
});

schema.virtual('password').set(function(password) {
  // hash the password with bcrypt
  // set this passwordHash to the hashed password
});

// for login (verify that a particular user's username and password are valid)
schema.statics.authorize = function({ username, password }) {
  // check that a user exists with a username
  // check that the user with the entered username actually exists
  // check that the entered password matches the user

  // if both conditions are true, return the user
  // otherwise, throw an error
};

// for signup and login
schema.methods.authToken = function() {
  // use jsonwebtoken to create a token for our user and return it
};

// for ensure auth middleware
schema.statics.findByToken = function(token) {
  // find the user that owns the token
};
