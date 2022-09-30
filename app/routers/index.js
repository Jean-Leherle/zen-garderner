const express = require('express');
const sessionRouter = require("./sessionRouter");
const memberRouter = require("./memberRouter");
const router = express.Router();

router.use(sessionRouter);
router.use(memberRouter);

module.exports = router;