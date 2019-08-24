const userRouter = require('express').Router();
var User = require('../models/user');
const { isLoggedIn } = require('../middlewares/auth');

userRouter.get('/:id', function(req, res){
    User.findById(req.params.id, function(err, user){
        if(err||!user){
            console.log("Error in finding user");
        }
        else{
            res.render('show-user',{user});
        }
    })
})

module.exports=userRouter;