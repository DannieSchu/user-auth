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


});
