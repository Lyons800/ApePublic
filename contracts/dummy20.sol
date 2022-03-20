// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SimpleToken is ERC20 {

    constructor() ERC20("simples", "hard") {
        _mint(msg.sender, 1000000000000000000000000000);
    }

}