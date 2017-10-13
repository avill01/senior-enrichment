'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { resolve } = require('path');

const db = require('../db');
const PORT = 1337;

const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(require('volleyball'));
}

module.exports = app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(express.static(resolve(__dirname, '..', 'public')))
  .use('/api', require('./api'))
  .get('/*', (_, res) =>
    res.sendFile(resolve(__dirname, '..', 'public/index.html'))
  )
  .use((err, req, res, next) => {
    console.error(err, typeof next);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });

if (module === require.main) {
  db.sync().then(() => {
    console.log('db synced');
    app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
  });
}
