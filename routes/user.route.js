const express = require('express')
const userRouter = express.Router()
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt =require('bcrypt')

userRouter.post('/login', async (req,res)=>{
    console.log(req.body)
    var user =  await userModel.findOne({phone: req.body.phone}).exec()
  
    if(!user){
        res.setHeader("Status",401)
        res.send({"message":"failed to login"})
    }else{
        if(bcrypt.compareSync(req.body.password,user.hashedPass) == true){
            res.json({
                token: jwt.sign({
                    phone:user.userPhone,
                    name:user.userName
                },user.hashedPass)
            })
        }
        else{
            res.setHeader("Status",401)
            res.send({"message":"failed to login"})
        }      
    }
})

userRouter.post('/signup',async(req,res)=>{

    var newUser = new userModel(req.body)
    newUser.hashedPass= bcrypt.hashSync(req.body.password,10)
    const addedUser = await newUser.save().catch(err => console.error(err))
    if(addedUser){
        res.json({
            token: jwt.sign({
                    phone:addedUser.phone,
                    name:addedUser.name
                },addedUser.hashedPass)
        })
    }
})

module.exports = userRouter