const { Router } = require('express');
const Job = require('../models/job');

module.exports = Router()
  .post('/', (req, res, next) => {
    Job
      .insert(req.body)
      .then(job => res.send(job))
      .catch(next);
  });
