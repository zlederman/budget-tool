const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
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
    }
})

module.exports = mongoose.model("user",userSchema)
