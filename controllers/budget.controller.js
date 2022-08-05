const budgetEntryModel = require('../models/model')
const configModel = require('../models/config.model')
const { typography } = require('@chakra-ui/react')

const getTotalHelper = async ({phone,msgObj}) => {

}

const getTotal = async ({phone,msgObj}) => {
    'total,food,<time frame> or total,*,*'
    //get config
    let config = await configModel.findOne({phone,phone}).exec()
    let types = config.map(t=>t.type)
    //expand wild card
    if(msgObj.type === "*"){
        msgObj.type = config.purchaseTypes
    }
    else{
        let match = types.filter((typ)=> typ === msgObj.type) 
        if(!match){
            throw new Error(`purchase type does not match any ${types.join(", ")}`)
        }
    }
    if(msgObj.args[0] === "*"){
        msgObj.args[0] = 'all-time'
    }
    else{
        if(msgObj.args[0] !== 'month' ||'week'){
            throw new Error(`time frame doesn't match month, week, *`)
        }
    }

    



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