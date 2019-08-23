var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var problemSchema = new Schema({
    name: String,
    owner: {type: Schema.Types.ObjectId, ref: "User"},
    proposal: [{
        owner: {type:Schema.Types.ObjectId, ref: "User"},
        desc: String
    }],
    desc: String,
    amount: Number
})

module.exports= mongoose.model("ProblemStatement", problemSchema);
