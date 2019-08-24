const userRouter = require('express').Router();
var User = require('../models/user');
var Project = require('../models/project');

const { isLoggedIn } = require('../middlewares/auth');

userRouter.get('/:id', function(req, res){
    User.findById(req.params.id, function(err, user){
        if(err||!user){
            console.log("Error in finding user");
            res.json({success: false});
        }
        else{
            let po=0, ppo=0;
            Project.find()
                .populate('owner')
                .populate('members').exec(function(err, projects){
                    console.log(req.params)
                    if(err){
                        console.log("Error in finding user");
                        res.json({success: false});
                    }
                    else{
                        for(let i=0; i<projects.length; i++){
                            if(projects[i].owner._id.toString()==req.params.id){
                                po++;
                            }

                            for(let j=0; j<projects[i].members.length; j++){
                                if(projects[i].members[j]._id.toString()==req.params.id){
                                    ppo++;
                                }
                            }
                        };
                        console.log('po:', po, 'ppo:', ppo);
                        res.render('show-user', {user, projectsOwned: po, projectsPartOf: ppo})
                    }
                })


            res.render('show-user',{user});
        }
    })
})

module.exports=userRouter;