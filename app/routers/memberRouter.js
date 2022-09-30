const express = require('express');

const checkAuthorization = require('./../middleware/checkAuthorization');
const memberController = require('../controllers/memberController');
const ROUTES = require('../config').ROUTES;

const memberRouter = express.Router();

memberRouter
  .get(ROUTES.MEMBER, checkAuthorization, memberController.getProfile)
  .post(ROUTES.MEMBER, memberController.register)
  //.put(ROUTES.MEMBER, checkAuthorization, userController.updateProfile)

module.exports = memberRouter;