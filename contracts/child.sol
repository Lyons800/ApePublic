// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

interface claimInterface{
    function claimTokens() external payable;
}

contract ChildContract is IERC721Receiver, Ownable{
    using EnumerableSet for EnumerableSet.UintSet;
    using SafeERC20 for IERC20;

    address Parent;
    uint256 Type = 0;

    address primaryWallet = 0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C;
    address secondaryWallet = 0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB;
    address ukraine = 0xdD870fA1b7C4700F2BD7f44238821C26f7392148;
    address matcher = 0x617F2E2fD72FD9D5503197092aC168c91465E7f2;

    address public Claim = 0x7EF2e0048f5bAeDe046f6BF797943daF4ED8CB47;

    ERC721Enumerable public ALPHA = ERC721Enumerable(0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8);
    ERC721Enumerable public BETA = ERC721Enumerable(0xf8e81D47203A594245E36C48e151709F0C19fBe8);
    ERC721Enumerable public GAMMA = ERC721Enumerable(0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B);

    mapping(address => EnumerableSet.UintSet) internal _depositedPrimary;
    mapping(address => EnumerableSet.UintSet) internal _depositedSecondary;

    constructor(address _creator, uint256 _tokenId, address _parent) public{
        primaryWallet = _creator;
        _depositedPrimary[_creator].add(_tokenId);
        Parent = _parent;
    }


    function withdrawAlpha(uint256 tokenId) external{
        require(_depositedPrimary[msg.sender].contains(tokenId), "Query for a token you don't own");

        _depositedPrimary[msg.sender].remove(tokenId);

        ALPHA.safeTransferFrom(address(this), msg.sender, tokenId);
    }

    function setSecondary(address _address, uint256 _tokenId) external {
        require(msg.sender==address(Parent), "You are not the farther");
        _depositedSecondary[_address].add(_tokenId);
    }

    function setType() external{
        require(msg.sender==address(Parent), "You are not the farther");
        Type = 3;
    }

    function withdrawBeta(uint256 tokenId) external  {
        require(_depositedPrimary[msg.sender].contains(tokenId), "Query for a token you don't own");

        _depositedPrimary[msg.sender].remove(tokenId);

        BETA.safeTransferFrom(address(this), msg.sender, tokenId);
    }

    function withdrawGamma(uint256 tokenId) external  {
        require(_depositedSecondary[msg.sender].contains(tokenId), "Query for a token you don't own");

        _depositedSecondary[msg.sender].remove(tokenId);

        GAMMA.safeTransferFrom(address(this), msg.sender, tokenId);
    }

    function withdraw(IERC20 token) public {

        uint256 balance = token.balanceOf(address(this));
        require(balance > 0, "Insufficent balance");
        console.log("oK SO", balance);
        console.log("The token type should be :", Type);
        if(Type == 3){
            console.log("Do you get this far");
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
        //require(GAMMA.balanceOf(address(this)) > 0, "Waiting for kennel.");
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