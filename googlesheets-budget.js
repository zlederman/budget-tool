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
        await this._sheet.loadCells('B1:F100');

    }
    async insertNewRow(itemVal, typeVal, priceVal, paymentVal){
        this.updateOffset()
        var datetime = new Date();
        let row = this._tail
        const item = this._sheet.getCell(row,1)
        const type =  this._sheet.getCell(row,2)
        const cost = this._sheet.getCell(row,3)
        const payment = this._sheet.getCell(row,4)
        const date = this._sheet.getCell(row,5)
        date.value = datetime.toISOString().slice(0,10)
        item.value = itemVal
        type.value = typeVal
        cost.value = priceVal
        payment.value = paymentVal
        await this._sheet.saveUpdatedCells()
        this._tail += 1
    }
    updateOffset() {
        let tempOffset = this._tail
        while(this._sheet.getCell(tempOffset,1).value != null){ //while not empty find and empty
            tempOffset ++;
        }
        this._tail = tempOffset
    }

   
}

const budgetSheet = new BudgetSheet(1,'1oNZCfCzIx1QXd2vnTwiu4awHWlgUOByKErvBH1ZmKoQ')
