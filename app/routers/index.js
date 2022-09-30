const express = require('express');
const sessionRouter = require("./sessionRouter");
const userRouter = require("./userRouter");
const tasksRouter = require("./tasksRouter")
const ROUTES = require('../config').ROUTES;

const router = express.Router();

router.use(sessionRouter);
router.use(userRouter);
router.use(ROUTES.TASKS, tasksRouter);

module.exports = router;