const express = require('express');

const checkAuthorization = require('./../middleware/checkAuthorization');
const memberController = require('../controllers/memberController');
const ROUTES = require('../config').ROUTES;

const memberRouter = express.Router();

memberRouter
  .get(ROUTES.MEMBER, checkAuthorization, memberController.getProfile)
  .post(ROUTES.MEMBER, memberController.register)
  .patch(ROUTES.MEMBER, checkAuthorization, memberController.updateProfile)

module.exports = memberRouter;