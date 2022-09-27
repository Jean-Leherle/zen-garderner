const express = require('express');

const router = express.Router();

router.use('/', (req, res) => {
  res.json('hello world');
});
module.exports = router;