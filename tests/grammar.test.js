const { getExpectedBodyHash } = require('twilio/lib/webhooks/webhooks')
const parser = require('../grammar/SMSGrammar')

inputs = [
    'A',
    'A,B',
    'A,B,C,',
    'A,B,C,D,E',
    ',,,,',
    '',
]
inputsGood = [
    'nachos,food,$9.99,credit',
    'burritos+tacos,food,$10,debit',
    'cheese wizz, food , $7 , debit',
    'add,type,xxx',
    'add,payment,xxx',
]

const parsed = parser.parse(inputsGood[1])
console.log(parsed)



test('it should reject these inputs',()=>{
    for(let testCase of inputs){
        try{
            const parsed = parser.parse(testCase)
        }catch(err){
            expect(err.hasOwnProperty('location'))
        }
    }
})

test('it should accept these inputs',()=>{
    for(let testCase of inputsGood) {
        const parsed = parser.parse(testCase)
        expect(parsed.hasOwnProperty('cmd'))
    }
})