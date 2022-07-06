const express = require('express')
const userRouter = express.Router()
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt =require('bcrypt')

userRouter.post('/login', async (req,res)=>{
    var user = await userModel.findOne({userPhone: req.userPhone})
    if(!user){
        res.sendStatus(401)
        .json({message:"Auth failed"})
    }else{
        res.json({
            token: jwt.sign({
                email:user.userPhone,
                name:user.userName
            })
        })
    }
})

userRouter.post('/signup',async(req,res)=>{
    var newUser = new userModel(req.body)
    newUser.hashedPass= bcrypt.hashSync(req.body.password,10)
    await newUser.save().catch(err => console.error(err))
})

module.exports = userRouter