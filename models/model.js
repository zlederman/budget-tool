const mongoose = require("mongoose");
const userModel = require("./user.model")
const configModel = require("./config.model");
const { filter } = require("lodash");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId

const budgetEntry = new Schema({
    budgetEntry : ObjectId,
    purchaseName : String,
    purchaseType : {
        type : String,
        required : true
    },
    purchaseCost : Number,
    purchaseMethod : {
        type : String,
        required: true
    },
    purchaseDate : {
        type: Date,
        default : Date.now()
    },
    userPhone: {
        type: String,
        required: true,
    }
})

budgetEntry.path('purchaseType').set((v) =>{
    return v.toLowerCase()
})

budgetEntry.path('purchaseCost').set((v)=>{
    return parseFloat(v.replace('$',''))
})

function findType(purchaseType,userTypes){
    return userTypes.filter(purch=>purch.type === purchaseType).length != 0
}
function findMethod(method,userMethods){
    return userMethods.filter(meth=>meth === method).length != 0
}
budgetEntry.methods.confirm = async function confirm(){
    
    let config = await configModel.findOne({phone: this.userPhone}).exec()
    if(config == null){
        return 'please create an account at budgetBuddy.dev'
    }
    if(!findType(this.purchaseType,config.purchaseTypes)){
        return 'please enter a correct purchase type'
    }
    if(!findMethod(this.purchaseMethod,config.paymentMethods)){
        return 'please enter a correct purchase method'
    }
    return `purchase confirmed\npurchase id: ${this._id}`
    
}

module.exports = mongoose.model("budget-sms-table",budgetEntry)