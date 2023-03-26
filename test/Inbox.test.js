// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const {interface,bytecode}= require('../compile');
const web3 = new Web3(ganache.provider()) //this line over here is an code to create an instane of web3
//Mocha is a test running framework
let accounts;
let inbox;
beforeEach(async()=>{
    //get a list of all accounts
    accounts= await web3.eth.getAccounts() //this line of code over here is used to generate an list of account
    //use onf of those accounts to deploy

    //Contract is a construction property, so at first we parse our abi file given by our contract which is interface, then the deploy line deploys the smart contract using our bytecode, and then in the last line sends takes the from property and the gas price
    inbox= await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments:['Hi there']})
    .send({from: accounts[0],gas:'1000000'});

})
describe('Inbox',()=>{
    it('deploys a contract',()=>{
        assert.ok(inbox.options.address);
    });
    it('has a default message',async ()=>{
        const message = await inbox.methods.message().call(); //it's accessing the methods in the object array and calling message, message parenthize r used to give the arguments for the functon and the call parenthize is used to provide an argument for transactions
        assert.equal(message,'Hi there')
    });
    it('can change the message',async ()=>{
        await inbox.methods.setMessage('bye').send({from: accounts[0]}) //we know that setmessage function has the ability to modify data so we know it also need a particular amonut of gas fees to execute this process, that's why we use send option
        const message= await inbox.methods.message().call();
        assert.equal(message,'bye')
    })
})