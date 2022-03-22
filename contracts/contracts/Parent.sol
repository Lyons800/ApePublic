// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

import "./Child.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface deployedContract { 
    function alphaClaimed(uint256 tokenID) external view returns(bool);
    function betaClaimed(uint256 tokenID) external view returns(bool);
    function gammaClaimed(uint256 tokenID) external view returns(bool);
    function getAlphaClaimed(uint256 _id ) external view returns (bool);
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
    uint count = 1;

    struct _BAYC { 
        address wallet;
        uint256 tokenID;
    }
    mapping (uint => _BAYC) public BAYC;
    uint BAYCcount;

    struct _MAYC { 
        address wallet;
        uint256 tokenID;
    }
    mapping (uint => _MAYC) public MAYC;
    uint MAYCcount;



    constructor()  {


    }

    function depositAlphaTest(uint256 _id, address _grapes) public returns (bool){
       bool not_x = deployedContract(_grapes).getAlphaClaimed(_id);

       return not_x;
    }


    //Deposit apes into contract.
    function depositAlpha(uint256 _id) public{
        require(claimContract.alphaClaimed(_id) == false, "Token has been claimed");

        BAYC[BAYCcount++] = _BAYC(
            msg.sender,
            _id
        );

        ALPHA.transferFrom(msg.sender, address(this), _id);
    }

    function depositBeta(uint256 _id) public{
        require(claimContract.betaClaimed(_id) == false, "Token has been claimed");

        MAYC[MAYCcount++] = _MAYC(
            msg.sender,
            _id
        );

        BETA.transferFrom(msg.sender, address(this), _id);
    }

    //Deposit KENNEL into contract.
    //Creates child contract on deposit
    function depositGamma(uint256 _id) public{
        require(claimContract.gammaClaimed(_id) == false, "Token has been claimed");
        child[++count] = new ChildContract(msg.sender, _id, address(this));

        GAMMA.transferFrom(msg.sender, address(child[count]), _id);
    }

    //Matching Kennels
    //Creates new child contract, moves existing APE from this contract to child, to claim.
    function matchGammaBAYC(uint256 _id, uint256 _idBAYC) public{
        require(claimContract.alphaClaimed(_id) == false, "Token has been claimed");
        child[++count] = new ChildContract(msg.sender, _id, address(this));

        GAMMA.transferFrom(msg.sender, address(child[count]), _id);
        ALPHA.transferFrom(address(this), address(child[count]), BAYC[_idBAYC].tokenID);
        
        child[count].setType();
        child[count].setSecondary(BAYC[_idBAYC].wallet,BAYC[_idBAYC].tokenID);
        child[count].claim();
    }

    function matchGammaMAYC(uint256 _id, uint256 _idMAYC) public{
        require(claimContract.betaClaimed(_id) == false, "Token has been claimed");
        child[++count] = new ChildContract(msg.sender, _id, address(this));

        GAMMA.transferFrom(msg.sender, address(child[count]), _id);
        BETA.transferFrom(address(this), address(child[count]), MAYC[_idMAYC].tokenID);

        child[count].setSecondary(MAYC[_idMAYC].wallet,MAYC[_idMAYC].tokenID);
        child[count].claim();
    }
    

    //MATCHING APES TO KENNEL CONTRACTS
    function matchAlpha(uint _contract, uint256 _id) public{
        require(claimContract.alphaClaimed(_id) == false, "Token has been claimed");

        ALPHA.transferFrom(msg.sender, address(child[_contract]), _id);

        child[_contract].setType();
        child[_contract].setSecondary(msg.sender,_id);
        child[_contract].claim();
    }

    function matchBeta(uint _contract, uint256 _id) public{
        require(claimContract.betaClaimed(_id) == false, "Token has been claimed");

        BETA.transferFrom(msg.sender, address(child[_contract]), _id);

        child[_contract].setSecondary(msg.sender,_id);
        child[_contract].claim();
    }


    function withdrawAlpha(uint256 tokenId, uint256 _index) external{
        require(BAYC[_index].wallet == msg.sender, "Token is not yours");
        ALPHA.safeTransferFrom(address(this), msg.sender, tokenId);
    }

    function withdrawBeta(uint256 tokenId, uint256 _index) external{
        require(MAYC[_index].wallet == msg.sender, "Token is not yours");
        BETA.safeTransferFrom(address(this), msg.sender, tokenId);
    }
    
    function setClaimContract(address _grapes) public {
        // Contract Grapes may be deployed here instead of being passed by argument
        claimContract = deployedContract(_grapes);
    }
}