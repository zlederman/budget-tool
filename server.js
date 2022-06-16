const express = require('express')
const http = require('http')
const mongoose = require("mongoose");
const app = express()
const smsRoute = require('./routes/sms.route')
require('dotenv').config()

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.kgaoe.mongodb.net/db?retryWrites=true&w=majority`;
mongoose.connect(uri,{ 
        useNewUrlParser: true,
        useUnifiedTopology: true })
        .then(()=>console.log('connected'))
        .catch((err)=> console.log(err))


app.use('/',smsRoute)


http.createServer(app).listen(80,async ()=>{
    console.log('Express is up!')
})

