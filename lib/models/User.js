const mongoose = require('mongoose');
const { hashSync } = require('bcryptjs');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  }
}, { 
  // remove passwordHash any time we JSONify a user
  toJSON: {
    // key is `transform`
    // value is callback function (takes in returned value, deletes passwordHash field)
    transform: (doc, ret) => {
      delete ret.passwordHash;
    }
  }
});

// use a virtual so we never save a plain text password in our db (only want the passwordHash to exist; the password itself should disappear)
schema.virtual('password').set(function(password) {
  // hash the password with bcrypt
  const hash = hashSync(password, 14);
  // const hash = hashSync(password, Number(process.env.SALT_ROUNDS) || 14);
  // set this passwordHash to the hashed password
  this.passwordHash = hash;
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

module.exports = mongoose.model('User', schema);
