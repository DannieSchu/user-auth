const { Router } = require('express');
// Import user
const User = require('../models/User');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

// Routes for user authentication
module.exports = Router()
// Signup route 
  .post('/signup', (req, res, next) => {
    User
      // create a new user
      .create(req.body)
      .then(user => {
        // create a JWT for user's session using authToken instance method on User model
        const token = user.authToken();
        // send user and JWT
        res.cookie('session', token, {
          maxAge: ONE_DAY_IN_MS,
          httpOnly: true
        });
        
        res.send(user);
      })
      .catch(next);
  })

// Login route
  .post('/login', (req, res, next) => {
    User
    // authenticate user (check user's username and password)
      .authorize(req.body)
      .then(user => {
        // create a JWT for user's session
        const token = user.authToken();
        // send user and JWT
        res.cookie('session', token, {
          maxAge: ONE_DAY_IN_MS,
          httpOnly: true
        });
        
        res.send(user);
      })
      .catch(next);
  })

// Verify route (verifies that user is logged in)
  .post('/verify', (req, res, next) => {
    // send user if person is logged in
    // send error if person is not logged in
  })
