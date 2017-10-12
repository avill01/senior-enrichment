'use strict';
const api = require('express').Router();
const { Student, Campus } = require('../db/models');

api.use('/campus', require('./routes/campus.js'));
api.use('/student', require('./routes/student.js'));
api.use('/*', (req, res, next) => {
  const err = Error('Data not found, likely bad request.');
  err.status = 404;
  next(err);
});

Student.belongsTo(Campus);

module.exports = api;
