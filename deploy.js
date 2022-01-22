// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const { abi, evm } = require('./compile.js')

const bytecode = evm.bytecode.object

const provider = new HDWalletProvider(
    'liberty cushion shoot trophy satoshi obtain absent tomorrow giraffe begin tone flavor',
	'https://rinkeby.infura.io/v3/634df70f0746429f82a4bcab16e31ca4'
)

const web3 = new Web3(provider)

const deploy = async () => {
	const accounts = await web3.eth.getAccounts()

	console.log('Attemting to deploy from account', accounts[0])

    /*
    Attemting to deploy from account 0xF0D44A9c008f471A5b60968950c19b8fBF1AeE7d
    Contract deployed to 0xB9D0092C137f7758fd444e8E218F3B00d6c4c73
	*/

	const result = await new web3.eth.Contract(abi)
		.deploy({ data: bytecode, arguments: ['Hi there!'] })
		.send({ gas: '1000000', from: accounts[0] })
        .catch(error => {
            console.log(error)
        })

	console.log('Contract deployed to', result.options.address)

	provider.engine.stop()
}

deploy()
