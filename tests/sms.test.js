const mongoose = require('mongoose')
const handleSMS = require('../routes/sms.route')
require('dotenv').config(
    {path: '.env'}
)
describe('it should handle various csv messages', () => {
    beforeAll(async()=>{
        const uri = `mongodb+srv://${process.env.NAME}:${process.env.PASS}@cluster0.kgaoe.mongodb.net/test?retryWrites=true&w=majority`;
        await mongoose.connect(uri,{ 
            useNewUrlParser: true,
            useUnifiedTopology: true })

    })


 
    test('basic budget entry',async ()=>{
            const phone = `3059049510`
            let res = await handleSMS({
                msg: 'tacos,food,$35,credit',
                phone: phone
            })
            console.log(res)
    })

    afterAll(async ()=>{
        await mongoose.connection.close()
    })
})