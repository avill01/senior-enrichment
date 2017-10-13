'use strict';

const Student = require('./student.js');
const Campus = require('./campus.js');

Student.belongsTo(Campus);
Campus.hasMany(Student, {
  onDelete: 'cascade'
});

module.exports = {
  Student,
  Campus
};
