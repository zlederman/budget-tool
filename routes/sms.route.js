const express = require('express')
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse
router.use(bodyParser.urlencoded({ extended: false}));
const parser = require('../grammar/SMSGrammar')
const {addEntry,getTotal} = require('../controllers/budget.controller')



const writeResponse = (res,str) =>{
    const twiml = new MessagingResponse()
    twiml.message(str);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
    return
}


const handleSMS = async ({msg,phone}) => {
    try{
        const parsed = parser.parse(msg)
        let command = parsed.cmd
        if(command === 'total'){
            return await getTotal({phone: phone,msgObj:parsed})
        }
        else{
            return await addEntry({phone:phone,msgObj:parsed})
        }
    }catch(err){
        if(err.hasOwnProperty('location')){
            return 'Malformed Response'
        }
    }
}
router.post('/',async (req,res)=>{
    let phone= req.body.From
    let msg = req.body.body
    let response = await handleSMS({phone:phone,msg:msg})
    writeResponse(res,response)
})


// router.get('/total')
module.exports = handleSMS