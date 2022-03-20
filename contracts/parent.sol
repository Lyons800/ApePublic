// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

import "./child.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface deployedContract { 
    function alphaClaimed(uint256 tokenID) external view returns(bool);
    function betaClaimed(uint256 tokenID) external view returns(bool);
    function gammaClaimed(uint256 tokenID) external view returns(bool);
}

contract ParentContract {
    using SafeERC20 for IERC20;
    using EnumerableSet for EnumerableSet.UintSet;

    deployedContract claimContract;
    //parents
    ERC721Enumerable public ALPHA = ERC721Enumerable(0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8);
    ERC721Enumerable public BETA = ERC721Enumerable(0xf8e81D47203A594245E36C48e151709F0C19fBe8);
    ERC721Enumerable public GAMMA = ERC721Enumerable(0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B);


    mapping (uint256 => ChildContract) public child;
    uint count;

    struct Details { 
        ChildContract childAddress;
        address primary;
        uint256 primaryNFT;
        address secondary;
        uint256 secondaryNFT;
    }

    mapping (uint => Details) public pairs;
    uint _user;

    struct _BAYC { 
        address wallet;
        uint256 tokenID;
    }
    mapping (uint => _BAYC) public BAYC;
    uint BAYCcount;

    constructor() public{}

    function depositAlpha(uint256 _id) public{
        require(claimContract.alphaClaimed(_id) == false, "Token has been claimed");

        BAYC[BAYCcount++] = _BAYC(
            msg.sender,
            _id
        );

        ALPHA.transferFrom(msg.sender, address(this), _id);
    }

    function depositGamma(uint256 _id) public{
        require(claimContract.gammaClaimed(_id) == false, "Token has been claimed");
        child[++count] = new ChildContract(msg.sender, _id, address(this));

        pairs[count] = Details(
            child[count],
            msg.sender,
            _id,
            0x0000000000000000000000000000000000000000,
            0
        );

        GAMMA.transferFrom(msg.sender, address(child[count]), _id);
    }

    function matchGamma(uint256 _id, uint256 _idBAYC) public{
        child[++count] = new ChildContract(msg.sender, _id, address(this));

        GAMMA.transferFrom(msg.sender, address(child[count]), _id);
        ALPHA.transferFrom(address(this), address(child[count]), BAYC[_idBAYC].tokenID);
    
        child[count].setType();
        child[count].setSecondary(msg.sender,_id);
        child[count].claim();
    }
    
    function matchAlpha(uint _contract, uint256 _id) public{
        require(claimContract.alphaClaimed(_id) == false, "Token has been claimed");
        require(pairs[_contract].secondary == 0x0000000000000000000000000000000000000000, "This primary has been used");

        pairs[_contract].secondary = msg.sender;
        pairs[_contract].secondaryNFT = _id;

        ALPHA.transferFrom(msg.sender, address(child[_contract]), _id);

        child[_contract].setType();
        child[_contract].setSecondary(msg.sender,_id);
        child[_contract].claim();
    }


    function depositGammaToChild(uint256 _contract,uint256 _id) public{
        require(GAMMA.ownerOf(_id) == msg.sender, "You must own this token");
        require(pairs[_contract].secondary == 0x0000000000000000000000000000000000000000, "this pair has been used");
        
        pairs[_contract].secondary = msg.sender;
        pairs[_contract].secondaryNFT = _id;

        GAMMA.transferFrom(msg.sender, address(child[_contract]), _id);
        child[_contract].setSecondary(msg.sender,_id);
        child[_contract].claim();
        child[_contract].withdraw(IERC20(0xd9145CCE52D386f254917e481eB44e9943F39138));
    }

    function withdrawAlpha(uint256 tokenId, uint256 _index) external{
        require(BAYC[_index].wallet == msg.sender, "Token is not yours");
        ALPHA.safeTransferFrom(address(this), msg.sender, tokenId);
    }

    //Setters
    function setClaimContract(address _grapes) public {
        claimContract = deployedContract(_grapes);
    }
}