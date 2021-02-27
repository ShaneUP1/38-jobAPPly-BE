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
  })
  
  .get('/update/:id', (req, res, next) => {
    Job
      .findById(req.params.id)
      .then(job => res.send(job))
      .catch(next);
  })
  
  .put('/update/:id', (req, res, next) => {
    Job 
      .update(req.params.id, req.body)
      .then(job => res.send(job))
      .catch(next);
  });

