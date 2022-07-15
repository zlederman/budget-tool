const express = require('express')
const budgetInfoRouter = express.Router()
const configModel = require('../models/config.model')
require('dotenv').config(
    {path: '.env'}
)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const sender = process.env.SENDER
const messagingSid = process.env.MESSAGING_SID


const client = require('twilio')(accountSid, authToken);
budgetInfoRouter.post('/submit-config',async (req,res)=>{
    req.body.phone = '+1' + req.body.phone;
    console.log(req.body)
    console.log(sender)
    try{
        const newConfig = new configModel(req.body)
        await newConfig.save().catch(err => console.error(err))
        client.messages
        .create({
            body:'Hi there, I am your new Budget Buddy 👋. Add me as a contact so you don\'t forget about me', 
            to:req.body.phone,
            from:sender
        })
        .then(message => console.log(message.sid))
        .done()
        client.messages
        .create({
            body:'Tell me what you spent by texting me something like:\nbaked beans,food,$3.00,credit', 
            to:req.body.phone,
            from:sender
        })
        .then(message => console.log(message.sid))
        .done()
        res.sendStatus(200)
    }catch(e){
        res.setHeader('Status','403')
        res.send('failed to add to server')
    }
})

module.exports= budgetInfoRouter