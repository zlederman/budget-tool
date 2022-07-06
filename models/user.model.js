mongoose = require('mongoose')
userSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    userPhone:{
        type:String,
        required:true
    },
    userPass :{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("user",userSchema)
