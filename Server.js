const express = require('express')
const http = require('http')
var bodyParser = require('body-parser')
const { GoogleSpreadsheet } = require('google-spreadsheet');

const MessagingResponse = require('twilio').twiml.MessagingResponse
const app = express()
app.use(bodyParser.urlencoded({ extended: false}));

class BudgetSheet {
    constructor(offset,docId) {
        this._tail = offset // of empty row
        this._id = docId
        this._creds = require('./config/concrete-kayak-312723-ebbad5e5af34.json')
    
    }
    async loadSheet() {
        this._doc = new GoogleSpreadsheet(this._id)
        await this._doc.useServiceAccountAuth(this._creds);
        await this._doc.loadInfo()
        this._sheet = this._doc.sheetsByIndex[0];
    }
    async insertNewRow(itemVal, typeVal, priceVal, paymentVal){
        let idxStr = 'B' + this._tail  + ":F" + this._tail;
        let idx = this._tail - 1;
        await this._sheet.loadCells(idxStr);
        const item = this._sheet.getCell(idx,1)
        const type =  this._sheet.getCell(idx,2)
        const cost = this._sheet.getCell(idx,3)
        const payment = this._sheet.getCell(idx,4)
        item.value = itemVal
        type.value = typeVal
        cost.value = priceVal
        payment.value = paymentVal
        await this._sheet.saveUpdatedCells()
        this._tail += 1
    }

}


const budgetSheet = new BudgetSheet(4,'1oNZCfCzIx1QXd2vnTwiu4awHWlgUOByKErvBH1ZmKoQ')

app.post('/sms',async (req,res)=>{
    const twiml = new MessagingResponse();
    budgetEntryParams = req.body.Body.split(",");
    if(budgetEntryParams.length < 4){
        twiml.message('Incorrect Budget Entry');
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    }
    await budgetSheet.insertNewRow(...budgetEntryParams);
})

http.createServer(app).listen(8888,async ()=>{
    await budgetSheet.loadSheet()
    console.log('Express is up!')
})

