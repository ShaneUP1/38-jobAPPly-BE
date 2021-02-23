const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('jobAPPly-BE routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates a job via POST', async() => {
    return await request(app)
      .post('/api/v1/jobs')
      .send({ 
        company: 'Imperfect Foods',
        applied_date: '02/20/2021',
        response_date: '',
        url: 'www.imperfectfoods.com',
        notes: '' })
      .then(res => {
        expect(res.body).toEqual({
          id: '1',
          company: 'Imperfect Foods',
          appliedDate: '02/20/2021',
          responseDate: '',
          url: 'www.imperfectfoods.com',
          notes: ''
        });
      });
  });
});
