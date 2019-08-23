const indexRouter = require('express').Router();
const authRouter = require("./auth");
const projectRouter = require("./project");
const { isLoggedIn } = require('../middlewares/auth');

indexRouter.get('/',isLoggedIn, (req, res) => {
    res.render('home');
})

indexRouter.use('/', authRouter);
indexRouter.use('/projects', projectRouter);

module.exports = indexRouter;
