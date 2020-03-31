const mongoose = require('mongoose');
const { hashSync } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

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
schema.statics.authorize = async function({ username, password }) {
  // check that the user with the entered username actually exists
    // if there's no user, throw an error
  // check that the entered password matches the user
    // if it doesn't, throw the same error as above
  // if both conditions are true, return the user
};

// for signup and login (take user and create token)
schema.methods.authToken = function() {
  // use jsonwebtoken to create a token for our user and return it (passwordHash is deleted by toJSON transform)
  const token = sign({ payload: this.toJSON() }, process.env.APP_SECRET);
  return token;
};

// for ensure auth middleware
schema.statics.findByToken = function(token) {
  // find the user that owns the token
};

module.exports = mongoose.model('User', schema);
