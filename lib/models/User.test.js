require('dotenv').config();

const User = require('./User');

describe('User model', () => {
  // confirm that virtual on user model hashes password
  it('hashes a password', () => {
    // create a new user instance
    const user = new User({
      username: 'charlotteKitty',
      password: 'wilmington'
    });
    // expect passwordHash to be a string
    expect(user.passwordHash).toEqual(expect.any(String));
    // expect password to be undefined
    expect(user.toJSON().password).toBeUndefined();
  });

  // confirm that authToken method creates a jsonwebtoken
  it('creates a jwt auth token', () => {
    // create a new user instance
    const user = new User({
      username: 'charlotteKitty',
      password: 'wilmington'
    });
    // call authToken instance method on user
    const token = user.authToken();
    // expect token to exist
    expect(token).toBeTruthy();
  });

  // confirm that findByToken method finds a user by their token
  it('finds a user by token', () => {
    const user = new User({
      username: 'charlotteKitty',
      password: 'wilmington'
    });
    // call authToken instance method on user
    const token = user.authToken();
    return User
      .findByToken(token)
      .then(foundUser => {
        expect(foundUser.toJSON().toEqual(user.toJSON()));
      });
  });
});
