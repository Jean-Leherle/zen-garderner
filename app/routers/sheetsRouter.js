const express = require('express');

const checkAuthorization = require('../middleware/checkAuthorization');
const sheetsController = require('../controllers/sheetsController');

const sheetsRouter = express.Router();

sheetsRouter
  //.get('/', sheetsController.getAll)
  .get('/public',sheetsController.getRandom)
  .get('/', checkAuthorization, sheetsController.getAll) // sheets/?q=[q]&p=[p]&n=[n]
  .get('/:sheetsId', checkAuthorization, sheetsController.getOneSheet)
  .get('/:sheetsId/action/', checkAuthorization, sheetsController.getActionFromSheet)
  .post('/', checkAuthorization, sheetsController.createNewSheet)

module.exports = sheetsRouter;