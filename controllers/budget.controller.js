const budgetEntryModel = require('../models/model')
const getTotal = async ({msgObj}) => {

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