const express = require('express');

const checkAuthorization = require('../middleware/checkAuthorization');
const sheetsController = require('../controllers/sheetsController');

const sheetsRouter = express.Router();

sheetsRouter
  //.get('/', checkAuthorization,sheetsController.getAll)
  .get('/', sheetsController.getAll)
    // sheets?q=[q]&p=[p]&n=[n]
  //.get('/:sheetsId', checkAuthorization, sheetsController.getOneSheets)

module.exports = sheetsRouter;