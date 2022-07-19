

budgetEntryModel = require('../models/model')



const createEntry = (parsedMsg,phone) => {
    return new budgetEntryModel({
        purchaseName: parsedMsg.cmd,
        purchaseType: parsedMsg.type,
        purchaseCost: parsedMsg.args[0],
        purchaseMethod: parsedMsg.args[1],
        purchaseDate: Date.now(),
        userPhone: phone,
    })
}
const addConfig = async  (parsedMsg,phone) => {
    console.log('hello')
}
    
     

module.exports = {
    createEntry:createEntry,
    addConfig: addConfig

}
