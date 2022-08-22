const configModel = require('../models/config.model')
const budgetEntryModel = require('../models/model')
const mongoose = require('mongoose')
require('dotenv').config(
    {path: '../.env'}
)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const sender = process.env.SENDER
const messagingSid = process.env.MESSAGING_SID
const client = require('twilio')(accountSid, authToken);
const uri = `mongodb+srv://${process.env.NAME}:${process.env.PASS}@cluster0.kgaoe.mongodb.net/db?retryWrites=true&w=majority`;
mongoose.connect(uri,{ 
        useNewUrlParser: true,
        useUnifiedTopology: true })
        .then(()=>console.log('connected'))
        .catch((err)=> console.log(err))




const messageEveryone = async (messages) => {
    let everyOne = await configModel.find().exec()
    for(config of everyOne){
        let phone = config.phone
        for(msg of messages) {
            client.messages
            .create({
                body:msg, 
                to:phone,
                from:sender
            })
            .then(message => console.log(message.sid))
            .done()
            await new Promise(r => setTimeout(r, 2000));
        }

    }
    
}

messageEveryone([
    "Hey budgetBuddy, some new updates have droppped 🥱",
    "you can now get totals \ntotal,<type|*>,<week|month|*>",
    "you can now add configurations \nadd,<paymentMethod|purchaseType>,<new>",
    "Enhanced error checking",
    "bye 🧙🏽‍♂️"
]).then()