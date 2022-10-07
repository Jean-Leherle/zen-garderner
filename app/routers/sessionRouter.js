const express = require('express');

const checkAuthorization = require('./../middleware/checkAuthorization');
const sessionController = require('../controllers/sessionController');
const sessionRouter = express.Router();

sessionRouter
  .post('/',sessionController.login)
  .delete('/',checkAuthorization, sessionController.logout);

module.exports = sessionRouter;