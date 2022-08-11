const budgetEntryModel = require('../models/model')
const configModel = require('../models/config.model')
const {
    getLastMonthDate,
    getLastWeekDate,
    prettyPrintObj,
    getTotalByType,
    getAllTime
} = require('../common/TimeTools')

const getTotalHelper = async (phone,msgObj) => {
    const template = {}
    let startFn = getAllTime
    for(typ of msgObj.type){
        template[typ] = 0
    }
    switch(String(msgObj.args)){
        case "week":
            console.log("hello")
            startFn = getLastWeekDate
            break
        case "month":
            startFn = getLastMonthDate
            break
        default:
            startFn = getAllTime
            break
    }
    let totalObj = await getTotalByType(phone,template,startFn)
    return `your requested total for the ${msgObj.args}\n${prettyPrintObj(totalObj)}`
}  

const getTotal = async ({phone,msgObj}) => {
    'total,food,<time frame> or total,*,*'
    //get config

    let config = await configModel.findOne({phone,phone}).exec()
    let types = config.purchaseTypes.map(t=>t.type)
    //expand wild card
    
    if(msgObj.type === "*"){
        msgObj.type = config.purchaseTypes
    }
    else{
        let match = types.filter((typ)=> typ === msgObj.type) 
        if(!match){
            throw new Error(`purchase type does not match any ${types.join(", ")}`)
        }
        msgObj.type = match
    }

    if(msgObj.args === "*"){
        msgObj.args = 'all-time'
    }
    else if (msgObj.args !== 'month' && msgObj.args !== "week") {
        throw new Error(`time frame ${msgObj.args} doesn't match month, week, *`)
    }

    let totalStr = await getTotalHelper(phone,msgObj)
    return totalStr
}


const addEntry = async ({msgObj,phone}) => {
    const newEntry = new budgetEntryModel({
        purchaseName : msgObj.cmd, 
        purchaseType : msgObj.type, //sanitize type enum
        purchaseCost : msgObj.args[0],
        purchaseMethod : msgObj.args[1], //sanitize payment method enum
        purchaseDate : Date.now(),
        userPhone : phone
    })
    const res = await newEntry.confirm()
    if(res.valid){
        await newEntry.save()
    }
    return res.msg
}
module.exports = {getTotal : getTotal, addEntry: addEntry}