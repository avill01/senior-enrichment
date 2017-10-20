'use strict';

const api = require('express').Router();
const { Campus, Student } = require('../../db/models');

// GET /api/students
api.get('/', (req, res, next) => {
  Student.findAll({ include: [{ model: Campus }] })
    .then(students => {
      console.log(students);
      res.json(students);
    })
    .catch(next);
});

// POST /api/students
api.post('/', (req, res, next) => {
  Student.findOrCreate({
    where: { name: req.body.name, email: req.body.email },
    defaults: { campusId: req.body.campusId }
  })
    .spread((student, created) => {
      if (created) res.json(student);
      else res.send('already exists!');
    })
    .catch(next);
});

// Params: get student if exists
api.param('studentId', (req, res, next, studentId) => {
  Student.findById(studentId).then(student => {
    if (!student) {
      const err = Error('Student not found');
      err.status = 404;
      next(err);
    } else {
      req.student = student;
      next();
    }
  });
});

// GET api/students/:studentId
api.get('/:studentId', (req, res, next) => {
  res.json(req.student);
});

// PUT api/students/:studentId
api.put('/:studentId', (req, res, next) => {
  req.student
    .update(req.body)
    .then(student => {
      res.json(student);
    })
    .catch(next);
});

// DELETE api/students/:studentId
api.delete('/:studentId', (req, res, next) => {
  req.student
    .destroy()
    .then(() => res.status(204).end())
    .catch(next);
});

module.exports = api;
