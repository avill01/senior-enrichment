'use strict';

const api = require('express').Router();
const { Student } = require('../../db/models');

api.get('/', (req, res, next) => {
  Student.findAll({})
    .then(students => {
      res.json(students);
    })
    .catch(next);
});

api.post('/', (req, res, next) => {
  console.log(req.body);
  Student.findOrCreate({
    where: { name: req.body.name, email: req.body.email },
    defaults: {campusId: req.body.campusId}
  }) //returns an array [student object, created boolean]
    .spread((student, created) => {
      console.log(student);
      if (created) res.send('created!');
      else res.send('already exists!');
    })
    .catch(next);
});

api.param('studentId', (req, res, next, studentId) => {
  Student.findById(studentId).then(student => {
    if (!student) {
      const err = Error('Student not found');
      err.status = 404;
      throw err;
    }
    req.student = student;
    next();
  });
});

api.get('/:studentId', (req, res) => {
  res.json(req.student);
});

api.put('/:studentId', (req, res) => res.send({ hello: 'student' }));

api.delete('/:studentId', (req, res) => res.send({ hello: 'student' }));

module.exports = api;
