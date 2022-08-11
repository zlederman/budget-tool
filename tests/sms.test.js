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
    test('gets all totals for all time',async() => {
        const phone = '+13059049510'


        let res = await handleSMS({
            msg:'total,*,*',
            phone:phone
        })
        expect(res).toContain(`your requested total for the all-time`)
    })
    test('gets your total for all time',async () => {
        const phone = '+13059049510'


        let res = await handleSMS({
            msg:'total,essentials,*',
            phone:phone
        })
        expect(res).toContain(`your requested total for the all-time`)
    })
    test('gets your total for the month',async () => {
        const phone = '+13059049510'
        let res = await handleSMS({
            msg:'total,essentials,month',
            phone:phone
        })
        expect(res).toContain(`your requested total for the month`)
    })

    afterAll(async ()=>{
        await mongoose.connection.close()
    })
})