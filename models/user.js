var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    email: String,
    mobile: String,
    password: String,
    isStudent: Boolean,

    college: {type: String, default: null},
    branch: {type: String, default: null},
    year: {type: String, default: null},
    resume: {type: String, default: null},
    projectOwned: [{
        type: Object.Schema.Types.ObjectId,
        ref: "Project"
    }],
    projectPartOf: [{
        type: Object.Schema.Types.ObjectId,
        ref: "Project"
    }],
    isClub: Boolean,
    problemStatementPartOf: [{
        type: Object.Schema.Types.ObjectId,
        ref: "ProblemStatement"
    }],


    
    problemStatementsCreated: [{
        type: Object.Schema.Types.ObjectId,
        ref: "ProblemStatement"
    }],
    projectsFunded: [{
        type: Object.Schema.Types.ObjectId,
        ref: "Project"
    }],

})

module.exports= mongoose.model("User", userSchema);
