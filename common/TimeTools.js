const configModel = require('../models/config.model')
const budgetEntryModel = require('../models/model')
const mongoose = require('mongoose')
require('dotenv').config(
    {path: '../.env'}
)
const WEEK = 7*1000*60*60*24
const MONTH = 30*1000*60*60*24

const getLastWeekDate = () => {
    return Date.now() - WEEK
}
const getLastMonthDate = () => {
    return Date.now() - MONTH
}
const getAllTime = () => {
    return 0
}
const getTotalByType = async (id,template,startFn) => {
    //pass in empty object of users purchase types
    // id is user phone number
    // template is the users configs with zeros set
    const end = Date.now()
    const start = startFn()
    const entries = await budgetEntryModel.find({
        userPhone: id,
        purchaseDate: {
            $gte: start,
            $lt: end
        }
    }).exec()
    total = 0
    for(let i = 0; i < entries.length; i++){
        if(await entries.at(i).purchaseType in template){
            template[entries.at(i).purchaseType] += entries.at(i).purchaseCost
            total += entries.at(i).purchaseCost
        }
        
    }
    return {...template}
}

const prettyPrintObj = (obj)=>{
    res = ""
    let keys = Object.keys(obj)
    for(k of keys){
        if(k === keys.at(-1) ){
            res += `${k}: $${obj[k]}`
        }
        else if(k !== 'total'){
            res += `${k}: $${obj[k]}\n`
        }
    }
    return res
}

module.exports = {
    getLastMonthDate,
    getLastWeekDate,
    getAllTime,
    prettyPrintObj,
    getTotalByType,
}