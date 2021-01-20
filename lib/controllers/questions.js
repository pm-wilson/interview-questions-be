const Question = require('../models/Question');
const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res, next) => {
    Question
      .insert(req.body)
      .then(question => res.send(question))
      .catch(next);
  })
  .put('/:id', (req, res, next) => {
    Question
      .updateById(req.params.id, req.body)
      .then(question => res.send(question))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Question
      .find()
      .then(questions => res.send(questions))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Question
      .findById(req.params.id)
      .then(question => res.send(question))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Question
      .deleteById(req.params.id)
      .then(question => res.send(question))
      .catch(next);
  });
