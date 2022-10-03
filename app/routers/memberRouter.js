const express = require('express');

const checkAuthorization = require('./../middleware/checkAuthorization');
const memberController = require('../controllers/memberController');

const memberRouter = express.Router();

memberRouter
  .get('/', checkAuthorization, memberController.getProfile)
  .post('/', memberController.register)
  .patch('/', checkAuthorization, memberController.updateProfile)

module.exports = memberRouter;