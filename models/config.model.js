const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const purchaseSchema = mongoose.Schema({type: String, budget:Number})
const configSchema = mongoose.Schema({
    phone: String,
    paymentMethods:[{
        type: String
    }],
    purchaseTypes:[purchaseSchema],
    sendSummary: Boolean
})
module.exports = mongoose.model("configs-table",configSchema)
