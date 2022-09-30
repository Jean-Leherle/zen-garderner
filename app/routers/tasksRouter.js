const express = require('express');

const checkAuthorization = require('../middleware/checkAuthorization');
const tasksController = require('../controllers/tasksController');

const tasksRouter = express.Router();

tasksRouter
  .get('/', checkAuthorization,tasksController.getAll)

module.exports = tasksRouter;