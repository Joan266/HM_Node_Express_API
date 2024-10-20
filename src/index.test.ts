import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import { app } from './server';

describe('API Endpoints', () => {
  let userToken: string;
  let userId: string;

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/auth/signup')
      .send({
        "firstname": "juan",
        "lastname": "alemany",
        "password": "$2be$10$QlKU5P",
        "status": true,
        "gmail": "joanalemany26@gmail.com",
        "phonenumber": "645324709",
        "joindate": "2023-12-04T00:00:00.000Z",
        "jobdesk": "Provide concierge services and local information",
        "days": "Monday, Tuesday, Thursday",
        "hours": "9:00 AM - 5:00 PM"
      });

    expect(res.statusCode).toEqual(201);
    const { createduser } = res.body;
    expect(createduser.firstname).toEqual("juan");
    userId = createduser._id;
  });

  it('should login with new user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        "password": "$2be$10$QlKU5P",
        "gmail": "joanalemany26@gmail.com"
      });

    expect(res.statusCode).toEqual(200);
    const { token, user } = res.body;
    expect(user.firstname).toEqual("juan");
    userToken = token;
  });

  it('should retrieve the user by ID', async () => {
    const res = await request(app)
      .get(`/user/${userId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);
    const { user } = res.body;
    expect(user.firstname).toEqual("juan");
  });
});
