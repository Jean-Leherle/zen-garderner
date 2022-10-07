const express = require('express');

const checkAuthorization = require('./../middleware/checkAuthorization');
const memberController = require('../controllers/memberController');
const favoriteController = require('../controllers/favoriteController');

const memberRouter = express.Router();
memberRouter
  .get('/', checkAuthorization, memberController.getProfile)
  .post('/', memberController.register)
  .patch('/', checkAuthorization, memberController.updateProfile)
  //favorite
  .get('/sheet',checkAuthorization,favoriteController.getFavorite)
  .post('/sheet/:sheetsId',checkAuthorization,favoriteController.addFavorite)
  .delete('/sheet/:sheetsId',checkAuthorization,favoriteController.deleteFavorite)


module.exports = memberRouter;