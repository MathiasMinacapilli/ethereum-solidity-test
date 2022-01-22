// contract test code will go here
const assert = require('assert')
const ganache = require('ganache-cli') // local test network
const Web3 = require('web3')

const { abi, evm } = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
const initialMessage = 'Hi there!'

beforeEach(async () => {
    // get list of all accounts
    accounts = await web3.eth.getAccounts();

    // use one of those accounts to deploy the contract
    // inbox represents what exists in the blockchain
    // the provider is the communicator with the current connected blockchain
    // inbox.methods
    // inbox.options: information about the actual contract deployed (e.g. address)
    inbox = await new web3.eth.Contract(abi)
        .deploy({data: evm.bytecode.object, arguments: [initialMessage]})
        .send({ from: accounts[0], gas: '1000000' });
})

describe('Inbox', () => {
    it('deploys a contract', () => {
        // console.log(inbox);
        assert.ok(inbox.options.address);
    })

    it('has a default message', async () => {
        // in message() we could send params to the function of the contract
        // in call() we could send params to modify the transaction about who and how much gas
        const message = await inbox.methods.message().call();
        assert.equal(message, initialMessage);
    })

    it('can change the message', async () => {
        const newMessage = 'new message'
        await inbox.methods.setMessage(newMessage).send({ from: accounts[0] })
        const newMessageInContract = await inbox.methods.message().call()
        assert.equal(newMessage, newMessageInContract)
    })
})
