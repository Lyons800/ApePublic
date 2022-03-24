// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";


interface claimInterface{
    function claimTokens() external payable;
}

interface parentInterface{
    function flagContract(uint256 _id) external;
}

contract ChildContract is IERC721Receiver{
    using EnumerableSet for EnumerableSet.UintSet;
    using SafeERC20 for IERC20;

    address Parent;
    uint256 Type = 0;

    address primaryWallet = 0x000000000000000000000000000000000000dEaD;
    address secondaryWallet = 0x000000000000000000000000000000000000dEaD;
    address ukraine = 0x000000000000000000000000000000000000dEaD;
    address matcher = 0x000000000000000000000000000000000000dEaD;

    address public Claim = 0x26231e65A13578F75279dCEB6eea2CEECE9Ee620;

    ERC721Enumerable public ALPHA = ERC721Enumerable(0x8f2495Bdc0cfe864B5098bdE25698511a1973Af7);
    ERC721Enumerable public BETA = ERC721Enumerable(0xD7eeB4B6e97700c8dba03B897f8BA8b8ed39E1fd);
    ERC721Enumerable public GAMMA = ERC721Enumerable(0x069225faBD2f7bEA2Fa32Bdf1A035C0311Bd7BE0);

    mapping(address => EnumerableSet.UintSet) internal _depositedPrimary;
    mapping(address => EnumerableSet.UintSet) internal _depositedSecondary;

    constructor(address _creator, uint256 _tokenId, address _parent) public{
        primaryWallet = _creator;
        _depositedPrimary[_creator].add(_tokenId);
        Parent = _parent;
    }


    function setSecondary(address _address, uint256 _tokenId) external {
        require(msg.sender==address(Parent), "You are not the farther");
        secondaryWallet = _address;
        _depositedSecondary[_address].add(_tokenId);
    }

    function setType() external{
        require(msg.sender==address(Parent), "You are not the farther");
        Type = 3;
    }

    function withdrawAlpha(uint256 tokenId) external{
        require(_depositedSecondary[msg.sender].contains(tokenId), "Query for a token you don't own");

        _depositedSecondary[msg.sender].remove(tokenId);

        ALPHA.safeTransferFrom(address(this), msg.sender, tokenId);
    }

    function withdrawBeta(uint256 tokenId) external  {
        require(_depositedSecondary[msg.sender].contains(tokenId), "Query for a token you don't own");

        _depositedSecondary[msg.sender].remove(tokenId);

        BETA.safeTransferFrom(address(this), msg.sender, tokenId);
    }

    function withdrawGamma(uint256 tokenId) external  {
        require(_depositedPrimary[msg.sender].contains(tokenId), "Query for a token you don't own");

        _depositedPrimary[msg.sender].remove(tokenId);

        parentInterface(tokenId).flagContract(tokenId);

        GAMMA.safeTransferFrom(address(this), msg.sender, tokenId);
    }

    function withdraw(IERC20 token) public {

        uint256 balance = token.balanceOf(address(this));
        require(balance > 0, "Insufficent balance");

        if(Type == 3){
            token.transfer(primaryWallet, 10094000000000000000000);
 
            uint256 one = (token.balanceOf(address(this)) * 48) / 100;
            uint256 two = (token.balanceOf(address(this)) * 28) / 100;
            uint256 three = (token.balanceOf(address(this)) * 4) / 100;

            token.transfer(primaryWallet, one);
            token.transfer(secondaryWallet,two);
            token.transfer(ukraine, three);
            token.transfer(matcher, token.balanceOf(address(this)) );
        }else{
            token.transfer(primaryWallet, 2042000000000000000000);

            uint256 one = (token.balanceOf(address(this)) * 48) / 100;
            uint256 two = (token.balanceOf(address(this)) * 28) / 100;
            uint256 three = (token.balanceOf(address(this)) * 4) / 100;

            token.transfer(primaryWallet, one);
            token.transfer(secondaryWallet,two);
            token.transfer(ukraine, three);
            token.transfer(matcher, token.balanceOf(address(this)) );
        }
    }


    function claim() external payable{
        require((BETA.balanceOf(address(this)) > 0 || ALPHA.balanceOf(address(this)) > 0), "Waiting for APE");
        claimInterface(Claim).claimTokens();
        withdraw(IERC20(0xd9145CCE52D386f254917e481eB44e9943F39138));
    }

    function onERC721Received(
    address, 
    address, 
    uint256, 
    bytes calldata
    )external returns(bytes4) {
        return bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
    } 

}