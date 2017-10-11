'use strict';
const api = require('express').Router();
const db = require('../db');
const { Student, Campus } = require('../db/models');

Student.belongsTo(Campus);

module.exports = api
  .use('/campus', require('./routes/campus.js'))
  .use('/student', require('./routes/student.js'));
