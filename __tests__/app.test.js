const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Job = require('../lib/models/job');

describe('jobAPPly-BE routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates a job via POST', async() => {
    return await request(app)
      .post('/api/v1/jobs')
      .send({ 
        company: 'Imperfect Foods',
        appliedDate: '02/20/2021',
        responseDate: '',
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

  it('returns all jobs via GET', async() => {
    const postLinks = await Promise.all([
      { company: 'Imperfect Foods',
        appliedDate: '02/20/2021',
        responseDate: '',
        url: 'www.imperfectfoods.com',
        notes: '' },
      { company: 'Alchemy',
        appliedDate: '02/15/2021',
        responseDate: '',
        url: 'www.alchemycodelabs.com',
        notes: '' },
      { company: 'PayPal',
        appliedDate: '02/22/2021',
        responseDate: '',
        url: 'www.paypal.com',
        notes: '' }
    ].map(post => Job.insert(post)));

    const response = await request(app)
      .get('/api/v1/jobs');

    expect(response.body).toEqual(expect.arrayContaining(postLinks));
    expect(response.body).toHaveLength(postLinks.length);
  });
});
