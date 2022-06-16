const express = require('express')
const http = require('http')
const mongoose = require("mongoose");
const app = express()
const smsRoute = require('./routes/sms.route')
require('dotenv').config()

const uri = `mongodb+srv://eigenShmector:MSHi6ykok6fRZt@cluster0.kgaoe.mongodb.net/db?retryWrites=true&w=majority`;
mongoose.connect(uri,{ 
        useNewUrlParser: true,
        useUnifiedTopology: true })
        .then(()=>console.log('connected'))
        .catch((err)=> console.log(err))


app.use('/',smsRoute)


http.createServer(app).listen(80,async ()=>{
    console.log('Express is up!')
})

