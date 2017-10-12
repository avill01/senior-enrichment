'use strict';

const api = require('express').Router();
const { Campus } = require('../../db/models');

//Campus
api.get('/', (req, res, next) => {
  Campus.findAll()
    .then(campuses => {
      res.json(campuses);
    })
    .catch(next);
});

api.post('/', (req, res) => res.send({ hello: 'campus' }));

api.param('campusId', (req, res, next, campusId) => {
  Campus.findById(campusId).then(campus => {
    if (!campus) {
      const err = Error('Campus not found');
      err.status = 404;
      next(err);
    } else {
      req.campus = campus;
      next();
    }
  });
});

api.get('/:campusId', (req, res) => res.send(req.campus));

api.put('/:campusId', (req, res) => res.send({ hello: 'campus' }));

api.delete('/:campusId', (req, res) => res.send({ hello: 'campus' }));

module.exports = api;
