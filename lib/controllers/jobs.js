const { Router } = require('express');
const Job = require('../models/job');

module.exports = Router()
  .post('/', (req, res, next) => {
    Job
      .insert(req.body)
      .then(job => res.send(job))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Job
      .find()
      .then(jobs => res.send(jobs))
      .catch(next);
  });
