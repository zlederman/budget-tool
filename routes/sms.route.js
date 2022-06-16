const express = require('express')
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');


const validateSms = (sms) => {
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


router.post('/sms',(req,res)=>{
    validateSms(req.body.Body)
    
})
module.exports = router;