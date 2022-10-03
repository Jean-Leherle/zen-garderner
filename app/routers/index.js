const express = require('express');
const sessionRouter = require("./sessionRouter");
const tasksRouter = require("./tasksRouter")
const memberRouter = require("./memberRouter");
const ROUTES = require('../config').ROUTES;

const router = express.Router();

router.use(ROUTES.TASKS, tasksRouter);
router.use(sessionRouter);
router.use(memberRouter);

module.exports = router;