const express = require('express')
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse


const expenseEntryRegex = new RegExp('[\\w]*,[\\w]*,\\$(\\d+|\\d+.\\d+),[\\w]+')
const totalRequestRegex = new RegExp('total,[\\w]*,[\\w]*')
const validateSms = (sms) => {
    /*
     * checks if the string is mal-formed
     * checks if there are enough params
    */
    if(typeof sms == undefined) {
        return false
    }
    if(expenseEntryRegex.test(sms)){
        return true
    }
    if(totalRequestRegex.test(sms)){
        return true
    }
    return false
}


router.post('/sms',(req,res)=>{
    if(!validateSms(req.body.Body)){
        res.send("")
    }
    
    
})


console.log(validateSms('test ass,fart,$20,credit'))
console.log(validateSms('test,xxx,1234,'))
