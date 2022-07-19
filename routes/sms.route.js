const express = require('express')
const router = express.Router();
const parser = require('../grammar/SMSGrammar')
const bodyParser = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse
router.use(bodyParser.urlencoded({ extended: false}));

const budgetController = require('../controllers/budget.controller')
const createEntry  = require('../controllers/sms.controller').createEntry;



const writeResponse = (res,str) =>{
    const twiml = new MessagingResponse()
    twiml.message(str);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
    return
}
router.post('/',async (req,res)=>{
    let from = req.body.From
    let parsedMsg = {}
    try{
        parsedMsg = parser.parse(req.body.Body)
        if(parsedMsg.cmd === 'add'){}
        if(parsedMsg.cmd === 'total'){}
        else{
            const entryInstance = createEntry(parsedMsg,from)
            await entryInstance.confirm()
            await entryInstance.save()
        }
    }catch(err){
        if(!err.hasOwnProperty('location')){
            writeResponse(res,'an unknown err has occured')
        }
        else{
            writeResponse(res,`Syntax error near character ${err.location.start.offset}`)
        }
    }
    //now decide where the sms command goes
    // if(splitSms[0] == 'total'){
    //     response = await budgetController.getTotal(splitSms)
    // }
    // else{
    //     newEntry = await addEntry(splitSms,from) //creates entry from array
    //     response = await newEntry.confirm() 
    //     if(response.includes('purchase confirmed')){ //only write if purchase was confirmed
    //         await newEntry.save()
    //     }
    // }
    writeResponse(res,response)
})


// router.get('/total')
module.exports = router