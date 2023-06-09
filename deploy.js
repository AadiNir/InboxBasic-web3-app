// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {interface,bytecode} =require('./compile');

const provider = new HDWalletProvider(
    'before twelve frog surge better festival learn lyrics glare vintage panic enjoy','https://goerli.infura.io/v3/aa2e190113aa496b99adffb034d183b6'

);
const web3 = new Web3(provider);

const deploy = async ()=>{
    const accounts = await web3.eth.getAccounts();
    console.log('attempting to deploy form account',accounts[0])
    const result=await new web3.eth.Contract(JSON.parse(interface)) 
    .deploy({data:bytecode,arguments:['Hi there']}) 
    .send({gas:'1000000',from:accounts[0]})
    console.log('contract deploed to',result.options.address); 
    provider.engine.stop();
    
};
deploy();
