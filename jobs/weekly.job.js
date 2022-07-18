const cron = require('node-cron')
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


const summaryJob = cron.schedule('0 20 * * 7',async ()=> {
    await summarize()
})

const summarize = async () => {
    const summarizable = await configModel.find({sendSummary:true}).exec()
    for(let user of summarizable){
        let template = {}
        for(pt of user.purchaseTypes){

            template[pt.type] = 0
        }
        await sendSummary(user.phone,template);
    }
}

const getLastWeekDate = () => {
    return Date.now() - 7*1000*60*60*24
}

const getTotalByType = async (id,template) => {
    const end = Date.now()
    const start = getLastWeekDate()
    const entries = await budgetEntryModel.find({
        userPhone: id,
        purchaseDate: {
            $gte: start,
            $lt: end
        }
    }).exec()
    total = 0
    for(let i = 0; i < entries.length; i++){
        if(await entries.at(i).purchaseType in template){
            template[entries.at(i).purchaseType] += entries.at(i).purchaseCost
            total += entries.at(i).purchaseCost
        }
        
    }
    return {...template,total:total}
}

const prettyPrintObj = (obj)=>{
    res = ""
    for(kv in obj){
        if(kv !== 'total'){
            res += `${kv}: $${obj[kv]}\n`
        }
    }
    return res
}
const sendSummary = async (id,template) => {
    let agged = await getTotalByType(id,template)
    client.messages.create({
        body: `you spent $${agged.total} this week.\nHere's the break down:\n${prettyPrintObj(agged)}`,
        to:id,
        from:sender
    })
    .then(message=>console.log(message.sid))
    .done()
}
summarize().then()
module.exports = summaryJob