const express = require('express')
const http = require('http')
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
// const { GoogleSpreadsheet } = require('google-spreadsheet');
const budgetEntryModel = require('./model.js')
const MessagingResponse = require('twilio').twiml.MessagingResponse
const app = express()
require('dotenv').config()
app.use(bodyParser.urlencoded({ extended: false}));
const uri = `mongodb+srv://eigenShmector:MSHi6ykok6fRZt@cluster0.kgaoe.mongodb.net/db?retryWrites=true&w=majority`;
mongoose.connect(uri,{ 
        useNewUrlParser: true,
        useUnifiedTopology: true })
        .then(()=>console.log('connected'))
        .catch((err)=> console.log(err))




function invalidSMSException() {}
function smsValidator(sms){
    /*
     * checks if the string is mal-formed
     * checks if there are enough params
     *
    */
    if(typeof sms== undefined) {
        throw new invalidSMSException()
    }
    if(sms.indexOf(",") == -1){
        throw new invalidSMSException()
    }
    let budgetEntryArr = sms.split(",");
    if(budgetEntryArr.length < 4){
        throw new invalidSMSException()
    }

    return budgetEntryArr
}


app.post('/sms',async (req,res)=>{
    const twiml = new MessagingResponse();
    let budgetStr = req.body.Body
    let budgetEntryParams = null
    try{
       budgetEntryParams = smsValidator(budgetStr) 
    }catch(e){
        if(e instanceof invalidSMSException){
            twiml.message('Incorrect Budget Entry');
            res.writeHead(200, {'Content-Type': 'text/xml'});
            res.end(twiml.toString());
            return
        }
        return
    }
    if(budgetEntryParams.length == 0){
        return
    }
    const newEntry = new budgetEntryModel({
        purchaseName : budgetEntryParams[0],
        purchaseType : budgetEntryParams[1],
        purchaseCost : budgetEntryParams[2],
        purchaseMethod : budgetEntryParams[3],
        purchaseDate : Date.now()
    })
    await newEntry.save()
    await funMoney(budgetEntryModel)
    twiml.message(newEntry.confirm())
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
    return
   
})



http.createServer(app).listen(80,async ()=>{

    console.log('Express is up!')
})

