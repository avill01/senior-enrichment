'use strict';

const db = require('../index.js');
const DataTypes = db.Sequelize;

const Campus = db.define('campus', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  address: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING,
    defaultValue: 'http://via.placeholder.com/150x150'
  }
});

module.exports = Campus;
