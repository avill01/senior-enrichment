'use strict';

const db = require('../index.js');
const DataTypes = db.Sequelize;

const Campus = db.define('campus', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    defaultValue: 'https://www.askideas.com/media/19/Papillon-Puppy-Looking.jpg'
  }
});

module.exports = Campus;
