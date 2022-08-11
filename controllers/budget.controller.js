const budgetEntryModel = require('../models/model')
const configModel = require('../models/config.model')
const WEEK = 7*1000*60*60*24
const MONTH = 30*1000*60*60*24
const getLastWeekDate = () => {
    return Date.now() - WEEK
}
const getLastMonthDate = () => {
    return Date.now() - MONTH
}

const getTotalHelper = async ({phone,msgObj}) => {
    //
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
    }

    if(msgObj.args === "*"){
        msgObj.args = 'all-time'
    }
    else if (msgObj.args !== 'month' && msgObj.args !== "week") {
        throw new Error(`time frame ${msgObj.args} doesn't match month, week, *`)
    }
    total = await getTotalHelper(phone,msgObj)
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