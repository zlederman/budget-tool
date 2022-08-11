const mongoose = require('mongoose')
const {handleSMS} = require('../routes/sms.route')
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

    test('account doesn\'t exist',async ()=>{
            const phone = `3059049510`
            let res = await handleSMS({
                msg: 'tacos,food,$35,credit',
                phone: phone
            })
            expect(res).toBe('please create an account at budgetBuddy.dev')
    })
    test('wrong purchase type',async ()=>{
        const phone = `+13059049510`
        let res = await handleSMS({
            msg: 'tacos,11111,$35,credit',
            phone: phone
        })
        expect(res).toContain('please enter a correct purchase type')
    })
    test('wrong purchase method',async ()=>{
        const phone = `+13059049510`
        let res = await handleSMS({
            msg: 'tacos,food,$35,clams',
            phone: phone
        })
        expect(res).toContain('please enter a correct purchase method')
    })
    test('adds correct input',async () => {
        const phone = '+13059049510'
        let res = await handleSMS({
            msg:'tacos,food,$35,credit',
            phone:phone
        })
        expect(res).toContain('purchase confirmed')
    })

    test('gets your total for the week',async () => {
        const phone = '+13059049510'
        const WEEK = 7*1000*60*60*24

        let res = await handleSMS({
            msg:'total,food,week',
            phone:phone
        })
        expect(res).toContain(`your total from ${Date.now() - WEEK} to ${Date.now()}`)
    })

    afterAll(async ()=>{
        await mongoose.connection.close()
    })
})