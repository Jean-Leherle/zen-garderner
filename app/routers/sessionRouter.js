const express = require('express');

const checkAuthorization = require('./../middleware/checkAuthorization');
const sessionController = require('../controllers/sessionController');
const ROUTES = require('./../config').ROUTES;
const sessionRouter = express.Router();

sessionRouter
  .post(ROUTES.SESSION, sessionController.login)
  .trace(ROUTES.SESSION, checkAuthorization, sessionController.cookieLogin)
  .delete(ROUTES.SESSION, checkAuthorization, sessionController.logout);

module.exports = sessionRouter;