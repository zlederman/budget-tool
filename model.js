const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId

const budgetEntry = new Schema({
    budgetEntry : ObjectId,
    purchaseName : String,
    purchaseType : {
        type : String,
        enum : ['investment','fun','accessory','essential'],
        default : 'accessory',
        required : true
    },
    purchaseCost : Number,
    purchaseMethod : {
        type : String,
        enum : ['debit','credit','cash'],
        required:  true
    },
    purchaseDate : {
        type: Date,
        default : Date.now()
    }
})

budgetEntry.path('purchaseType').set((v) =>{
    return v.toLowerCase()
})

budgetEntry.path('purchaseCost').set((v)=>{
    return parseFloat(v.replace('$',''))
})

budgetEntry.methods.confirm = function confirm(){
    const response = `
    you just purchased ${this.purchaseName}
    `
    return response
}
async function funMoney(Budget) {
    const funDocs = await Budget.aggregate([{$match : {purchaseType : 'fun'}}])
    let cost = 0
    for await (const doc of funDocs) {
        cost += doc.purchaseCost
    }
    console.log(cost)
}

module.exports = mongoose.model("budgetEntry",budgetEntry)