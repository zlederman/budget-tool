const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId

const budgetEntry = new Schema({
    budgetEntry : ObjectId,
    purchaseName : String,
    purchaseType : {
        type : String,
        enum : ['investment','fun','accessory','essential','food'],
        default : 'accessory',
        message: 'X',
        required : true
    },
    purchaseCost : Number,
    purchaseMethod : {
        type : String,
        enum : ['debit','credit','cash'],
        required:  true,
        message: 'X'
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
    if(this.purchaseType == 'X'){ 
        return 'purchase type not accepted'
    }
    if(this.purchaseMethod == 'X'){
        return 'purchase method not accepted'
    }
    return `you just purchased ${this.purchaseName}`
    
  
}


module.exports = mongoose.model("budgetEntry",budgetEntry)