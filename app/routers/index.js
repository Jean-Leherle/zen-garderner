const express = require('express');
const sessionRouter = require("./sessionRouter");
const userRouter = require("./userRouter");
const router = express.Router();

router.use(sessionRouter);
router.use(userRouter);

module.exports = router;