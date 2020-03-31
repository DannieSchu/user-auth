const User = require('../models/User');

module.exports = (req, res, next) => {
  // read the session cookie
  const token = req.cookies.session;
  // check JWT
  User
    .findByToken(token)
    .then(user => {
      // set a user if JWT is valid
      req.user = user;
      // send to next middleware
      next();
    })
    // send an error if JWT is not valid
    .catch(next);
};
