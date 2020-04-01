require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/models/User');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  // Signup route - should return only username (not password or password hash)
  it('signs up a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ 
        username: 'charlotteKitty',
        password: 'wilmington'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'charlotteKitty',
          __v: 0
        });
      });
  });

  // Login route - should verify username/password and return only username
  it('logs in a user', async() => {
    await User.create({         
      username: 'charlotteKitty',
      password: 'wilmington'
    });
         
    return request(app)
      .post('/api/v1/auth/login')
      .send({ 
        username: 'charlotteKitty',
        password: 'wilmington'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'charlotteKitty',
          __v: 0
        });
      });
  });

  it('fails to log in a user with a bad password', async() => {
    await User.create({         
      username: 'charlotteKitty',
      password: 'wilmington'
    });
         
    return request(app)
      .post('/api/v1/auth/login')
      .send({ 
        username: 'charlotteKitty',
        password: 'butters'
      })
      .then(res => {
        expect(res.body).toEqual({
          message: 'Invalid username or password',
          status: 500
        });
      });
  });
});
