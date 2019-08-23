const indexRouter = require('express').Router();
const authRouter = require("./auth");


indexRouter.use('/',authRouter);

module.exports = indexRouter;
