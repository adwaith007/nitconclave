const indexRouter = require('express').Router();
const authRouter = require("./auth");
const projectRouter = require("./project");
const problemRouter = require("./problem");

const { isLoggedIn } = require('../middlewares/auth');

indexRouter.get('/',isLoggedIn, (req, res) => {
    res.render('home');
})

indexRouter.use('/', authRouter);
indexRouter.use('/projects',isLoggedIn, projectRouter);
indexRouter.use('/problems',isLoggedIn, problemRouter);

module.exports = indexRouter;
