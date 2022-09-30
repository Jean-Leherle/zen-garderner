const express = require('express');

const checkAuthorization = require('./../middleware/checkAuthorization');
const userController = require('../controllers/userController');
const ROUTES = require('../config').ROUTES;

const userRouter = express.Router();

userRouter
  .get(ROUTES.USER, checkAuthorization, userController.getProfile)
  .post(ROUTES.USER, userController.register)
  //.put(ROUTES.USER, checkAuthorization, userController.updateProfile)

module.exports = userRouter;