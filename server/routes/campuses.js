'use strict';

const api = require('express').Router();
const { Campus, Student } = require('../../db/models');

// GET /api/campuses
api.get('/', (req, res, next) => {
  Campus.findAll({ include: [{ model: Student }] })
    .then(campuses => {
      res.json(campuses);
    })
    .catch(next);
});

// POST /api/campuses
api.post('/', (req, res, next) => {
  Campus.findOrCreate({
    where: { name: req.body.name }
  })
    .spread((campus, created) => {
      if (created) res.send(campus);
      else res.json('already exists');
    })
    .catch(next);
});

// Params: get campus if exists
api.param('campusId', (req, res, next, campusId) => {
  Campus.findOne({
    where: { id: campusId },
    include: [{ model: Student }]
  }).then(campus => {
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

// GET /api/campuses/:campusId
api.get('/:campusId', (req, res, next) => {
  res.json(req.campus);
});

// PUT /api/campuses/:campusId
api.put('/:campusId', (req, res, next) => {
  req.campus
    .update(req.body)
    .then(campus => {
      res.json(campus);
    })
    .catch(next);
});

// DELETE /api/campuses/:campusId
api.delete('/:campusId', (req, res, next) => {
  req.campus
    .destroy()
    .then(() => res.status(204).end())
    .catch(next);
});

module.exports = api;
