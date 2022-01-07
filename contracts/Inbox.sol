// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// linter warnings (red underline) about pragma version can igonored!

// contract code will go here
contract Inbox {
    // Solidity creates functinos for public attributs
    // to get the values, so get function is not necessary
    string public message;

    // public, private
    // view, constant: (both) returns data and does
    //                 not modify contract's data
    // pure: function will not modify or even read the
    //       contract's data
    // payable: when someone call this functions
    //          they might send ether along
    constructor(string memory initialMessage) {
        message = initialMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}
