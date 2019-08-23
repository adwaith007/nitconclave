const projectRouter = require('express').Router();
var Project = require('../models/project');
var User = require('../models/user');
var mongoose = require('mongoose');
const { isLoggedIn } = require('../middlewares/auth');

projectRouter.post('/create', isLoggedIn, function (req, res) {

    if (
        !req.body.isPublic ||
        !req.body.desc ||
        !req.body.name
    ) {
        console.log("Request parameters at project/create not sufficient");
        res.json({ success: false });
    }
    else {
        var project = new Project();
        project.isPublic = req.body.isPublic;
        project.owner = req.user._id;
        project.desc = req.body.desc;
        project.name = req.body.name;
        project.thread = [];
        if (req.body.tags) {
            project.tags = req.body.tags;
        }

        project.fundRecv = 0;
        project.members.push(req.user._id);
        project.save(function (err) {
            res.json({ success: true });
        })

    }

})

projectRouter.get('/new',async (req,res)=>{
    res.render('projects/new-project');
})


projectRouter.get('/', function (req, res) {
    Project.find({}).exec(function (err, projects) {
        if (err) {
            res.json({ success: false });
        }
        else {
            res.json({ success: true, projectList: projects });
        }
    })
})

projectRouter.get('/:id', function (req, res) {
    Project.findById(req.params.id, function (err, project) {
        if (err || !project) {
            console.log("Error or Project with the given id does not exists.");
            res.json({ success: false });
        }
        else {
            res.json({ success: true, project: project });
        }
    })
})

projectRouter.post('/:id/request', function (req, res) {
    Project.findById(req.params.id, function (err, project) {
        if (err || !project) {
            console.log("Error or Project with the given id does not exists.");
            res.json({ success: false });
        }
        else {
            project.requests.push(req.user);
            project.save(function (err) {
                if (err) {
                    console.log("Error in saving project");
                    res.json({ success: false });
                }
                else {
                    res.json({ success: true });
                }
            })
        }
    })
})

projectRouter.post("/:id/accept/:userid", function (req, res) {
    Project.findById(req.params.id, function (err, project) {
        if (err || !project) {
            console.log("Error or Project with the given id does not exists.");
            res.json({ success: false });
        }
        else if (req.user._id.toString() != project.owner.toString()) {
            console.log("Request not made by owner of the project.");
            res.json({ success: false });
        }
        else {
            User.findById(req.params.userid, function (err, user) {
                if (err || !user) {
                    console.log("Error or User with the given id does not exist.");
                    res.json({ success: false });
                }
                project.requests = project.requests.filter(preq => {
                    return preq.toString() != req.params.userid;
                })
                project.members.push(user._id);

                project.save(function (err) {
                    if (err) {
                        console.log("Error in saving updated project");
                        res.json({ success: false });
                    }
                    else {
                        res.json({ success: true });
                    }
                })
            })
        }
    })
})

module.exports = projectRouter;
