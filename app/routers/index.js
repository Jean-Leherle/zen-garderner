const express = require('express');
const sessionRouter = require("./sessionRouter");
const tasksRouter = require("./tasksRouter")
const memberRouter = require("./memberRouter");
const ROUTES = require('../config').ROUTES;

const router = express.Router();

router.use(ROUTES.SESSION, sessionRouter);
router.use(ROUTES.MEMBER, memberRouter);
router.use(ROUTES.TASKS, tasksRouter);


module.exports = router;