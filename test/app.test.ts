import supertest from 'supertest';
import { app } from '../src/app';

describe('App Endpoints', () => {
  it('handles 404 errors', async () => {
    await supertest(app).get('/the-fakest-route').expect(404);
  });
  it('handles 404s on post', async () => {
    await supertest(app)
      .post('/the-fakest-route')
      .send({ test: 'test' })
      .set('Accept', 'application/json')
      .expect(404);
  });
});
