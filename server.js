const express = require('express')
const http = require('http')
const path = require('path')
const mongoose = require("mongoose");
const app = express()
const smsRoute = require('./routes/sms.route')
const userRoute = require('./routes/user.route')
const addEntry = require('./controllers/sms.controller')
const budgetRoute = require('./routes/budget.route')
const budgetModel = require('./models/model')
const bodyParser = require('body-parser')

require('dotenv').config()

const uri = `mongodb+srv://${process.env.NAME}:${process.env.PASS}@cluster0.kgaoe.mongodb.net/db?retryWrites=true&w=majority`;
mongoose.connect(uri,{ 
        useNewUrlParser: true,
        useUnifiedTopology: true })
        .then(()=>console.log('connected'))
        .catch((err)=> console.log(err))

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'frontend','build')))

app.get('/',(req,res)=>{
    console.log(req)
    res.sendFile(path.join(__dirname,'frontend','build','index.html'))
})
app.use('/api/sms',smsRoute)
// app.use('/api/auth',userRoute)
app.use('/api/budget',budgetRoute)



http.createServer(app).listen(80,async ()=>{
    console.log('Express is up!')
})

