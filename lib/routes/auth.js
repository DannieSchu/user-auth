const { Router } = require('express');
// Import user
const User = require('../models/User');

// Routes for user authentication
module.exports = Router()
  User
    // Signup route 
    .post('/signup', (res, res, next) => {
      // create a new user
      // create a JWT for user's session
      // send user and JWT
    })

    // Login route
    .post('/login', (req, res, next) => {
      // authenticate user (check user's username and password)
      // create a JWT for user's session
      // send user and JWT
    })

    // Verify route (verifies that user is logged in)
    .post('/verify', (req, res, next) => {
      // send user if person is logged in
      // send error if person is not logged in
    })
