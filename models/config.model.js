const mongoose = require('mongoose')
const configSchema = mongoose.Schema({
    userId: String,
    paymentMethods:[{
        type: String
    }],
    purchaseTypes:[{
        type:String
    }]
})