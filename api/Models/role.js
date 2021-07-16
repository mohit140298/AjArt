const mongoose = require('mongoose')

const RoleSchema = new mongoose.Schema({
    index_id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        unique:true
    } 
});

const role = mongoose.model("Role", RoleSchema);


module.exports = role