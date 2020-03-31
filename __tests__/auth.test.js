require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

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
});