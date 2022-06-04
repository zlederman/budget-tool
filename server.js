const express = require('express')
const http = require('http')
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
// const { GoogleSpreadsheet } = require('google-spreadsheet');
const budgetEntryModel = require('./model.js')
const MessagingResponse = require('twilio').twiml.MessagingResponse
const getTotal = require('./budget-funcs').getTotal
var weeklyBudget = require('./budget-funcs').weeklyBudget
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
    */
    if(typeof sms == undefined) {
        throw new invalidSMSException()
        return
    }
    if(sms.indexOf(",") == -1){
        throw new invalidSMSException()
    }
    sms = sms.toLowerCase().replace(" ","")
    let cmdArr = sms.split(",");
    if(cmdArr.length != 3 && cmdArr[0] == 'total'){
        //this is getting total spending
        throw new invalidSMSException()
    }
    else if(cmdArr.length < 4 && cmdArr[0] != 'total'){
        // this is a budget entry
        throw new invalidSMSException()
    }

    return cmdArr
}

const getBudgetInfo = async (budgetEntryParams,budgetEntryModel) => {
    totalStr = await getTotal(budgetEntryModel,
        budgetEntryParams[1],
        budgetEntryParams[2]
    )
    return totalStr
}
const addEntry = async (budgetEntryParams,budgetEntryModel) => {
    const newEntry = new budgetEntryModel({
        purchaseName : budgetEntryParams[0],
        purchaseType : budgetEntryParams[1],
        purchaseCost : budgetEntryParams[2],
        purchaseMethod : budgetEntryParams[3],
        purchaseDate : Date.now()
    })
    await newEntry.save()
    return await newEntry.confirm()
}

function setWeekly(weeklyBudget,key,newBudget){
    weeklyBudget[key] = parseInt(newBudget)
    return `${key} budget updated!`
}


app.post('/sms',async (req,res)=>{
    const twiml = new MessagingResponse();
    let budgetStr = req.body.Body
    let budgetEntryParams = null
    let resStr = "Command Not Defined"
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
    if(budgetEntryParams[0] == 'total'){
        resStr = await getBudgetInfo(budgetEntryParams,budgetEntryModel);
    }
    else{
        resStr = await addEntry(budgetEntryParams,budgetEntryModel);
    }
    
    twiml.message(resStr)
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
    return
   
})



http.createServer(app).listen(80,async ()=>{

    console.log('Express is up!')
})

