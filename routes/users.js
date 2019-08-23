const userRouter = require('express').Router();
var User = require('../models/user');
const { isLoggedIn } = require('../middlewares/auth');

userRouter.get('/:id', function(req, res){
    User.findById(req.params.id, function(err, user){
        if(err||!user){
            console.log("Error in finding user");
        }
        else{
            res.json({success: true, user: user});
        }
    })
})

module.exports=userRouter;