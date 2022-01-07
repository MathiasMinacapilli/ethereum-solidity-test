// compile code will go here
const path = require('path')
const fs = require('fs')
const solc = require('solc')
// We can't require directly the
// Inbox.sol because node will
// execute it when requiring it
// and it will fail because is an
// unknwon extension

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol')
const source = fs.readFileSync(inboxPath, 'utf8')

const solcInput = {
    language: 'Solidity',
    sources: {
        contract: {
            content: source
        }
    }
}
contract = JSON.parse(solc.compile(JSON.stringify(solcInput)))

console.log(contract)

module.exports = contract

