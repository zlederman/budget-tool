const { before } = require('lodash')
const {handleSMS} = require('../routes/sms.route')


describe('it should handle various csv messages', () => {
    const uri = `mongodb+srv://${process.env.NAME}:${process.env.PASS}@cluster0.kgaoe.mongodb.net/test?retryWrites=true&w=majority`;
    mongoose.connect(uri,{ 
        useNewUrlParser: true,
        useUnifiedTopology: true })
        .then(()=>console.log('connected'))
        .catch((err)=> console.log(err))

    const phone = '3059049510'
    test('basic budget entry',()=>{
        expect(
            handleSMS({
                msg: 'tacos,food,$35,credit',
                phone: phone
            })
        )
    })
})