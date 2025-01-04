// const { string } = require('joi');
const mongoose = require('mongoose');


const passportLocalMongoose = require('passport-local-mongoose'); // this is for the passport local mongoose to add username and password 

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    }
});

userSchema.plugin(passportLocalMongoose); // It adds username and password to the schema automatically.

module.exports = mongoose.model('User', userSchema);