const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const configModel = require('./config.model')
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    hashedPass :{
        type:String,
        required:true
    },
    configId :{
        type: String
    }
})

module.exports = mongoose.model("users",userSchema)
