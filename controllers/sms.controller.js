

budgetEntryModel = require('../models/model')


const addEntry = async (budgetEntryParams,budgetEntryModel) => {
    const newEntry = new budgetEntryModel({
        purchaseName : budgetEntryParams[0], 
        purchaseType : sanitizeKeyWord(budgetEntryParams[1]), //sanitize type enum
        purchaseCost : budgetEntryParams[2],
        purchaseMethod : sanitizeKeyWord(budgetEntryParams[3]), //sanitize payment method enum
        purchaseDate : Date.now()
    })
    await newEntry.save()
    return await newEntry.confirm()
}

const sanitizeKeyWord = (keyWord) => {
    return keyWord.toLowerCase().replace(" ","")
}

module.exports = addEntry
