'use strict';

const db = require('../index.js');
const DataTypes = db.Sequelize;

const Student = db.define('student', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  address: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING,
    defaultValue: 'http://via.placeholder.com/150x150'
  }
});

module.exports = Student;
