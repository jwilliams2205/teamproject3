const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    userID:{
        type:String
    },
    password:{
        type: String
    }
});

module.exports = mongoose.model('User',userSchema)