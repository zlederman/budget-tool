const mongoose = require('mongoose')
const configSchema = mongoose.Schema({
    userPhone: String,
    paymentMethods:[{
        type: String
    }],
    purchaseTypes:[{
        type:String
    }]
})
module.exports = mongoose.model("configs-table",configSchema)
