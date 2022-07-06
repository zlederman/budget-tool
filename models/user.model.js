const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    userPhone:{
        type:String,
        required:true
    },
    hashedPass :{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("user",userSchema)
