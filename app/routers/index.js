const express = require('express');
const sessionRouter = require("./sessionRouter");
const memberRouter = require("./memberRouter");
const ROUTES = require('../config').ROUTES;
const router = express.Router();

router.use(ROUTES.SESSION, sessionRouter);
router.use(ROUTES.MEMBER, memberRouter);

module.exports = router;