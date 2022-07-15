

budgetEntryModel = require('../models/model')


const addEntry = async (budgetEntryParams,phone) => {
    const newEntry = new budgetEntryModel({
        purchaseName : budgetEntryParams[0], 
        purchaseType : sanitizeKeyWord(budgetEntryParams[1]), //sanitize type enum
        purchaseCost : budgetEntryParams[2],
        purchaseMethod : sanitizeKeyWord(budgetEntryParams[3]), //sanitize payment method enum
        purchaseDate : Date.now(),
        userPhone : phone
    })
    return newEntry
}
    
     

const sanitizeKeyWord = (keyWord) => {
    return keyWord.toLowerCase().replace(" ","")
}

module.exports = addEntry
