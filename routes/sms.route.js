const express = require('express')
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const { twiml } = require('twilio');
const MessagingResponse = require('twilio').twiml.MessagingResponse
router.use(bodyParser.urlencoded({ extended: false}));

const budgetController = require('../controllers/budget.controller')
const addEntry  = require('../controllers/sms.controller');
const { write } = require('fs');

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

const writeResponse = (res) =>{
    twiml.message('Incorrect Budget Entry');
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
    return
}
router.post('/sms',async (req,res)=>{
    let splitSms;
    let response;
    if(!validateSms(req.body.Body)){
        writeResponse('Malformed Response')
        return
    }
    splitSms = req.body.Body.split(',')
    if(splitSms[0] == 'total'){
        response = await budgetController.getTotal(splitSms)
    }
    else{
        response = await addEntry(splitSms)
    }
    writeResponse(response)
})


// router.get('/total')
module.exports = router