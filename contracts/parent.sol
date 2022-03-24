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
    ERC721Enumerable public ALPHA = ERC721Enumerable(0x8f2495Bdc0cfe864B5098bdE25698511a1973Af7);
    ERC721Enumerable public BETA = ERC721Enumerable(0xD7eeB4B6e97700c8dba03B897f8BA8b8ed39E1fd);
    ERC721Enumerable public GAMMA = ERC721Enumerable(0x069225faBD2f7bEA2Fa32Bdf1A035C0311Bd7BE0);

    address _FILLERWALLET = 0x000000000000000000000000000000000000dEaD;

    mapping (uint256 => ChildContract) public child;
    uint count;

    struct Details{
        address _childAddress; // ADDRESS Child contract address
        address _kennelOwner; // ADDRESS Primary wallet address
        uint256 _kennelID; // UINT256 Primary NFT ID 
        address _apeOwner; // APE WALLET
        uint256 _apeID; // APE TOKEN ID
        bool filled;
    }
    mapping (uint => Details) public children;

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

    constructor() public{}

    //Deposit apes into contract.
    function depositAlpha(uint256[] calldata _id) public{
        for(uint256 i=0; i < _id.length; i++){
            require(claimContract.alphaClaimed(_id[i]) == false, "Token has been claimed");
        }
        
        for(uint256 i=0; i < _id.length; i++){
            BAYC[BAYCcount++] = _BAYC(
                                    msg.sender,
                                    _id[i]
                                );

            ALPHA.transferFrom(msg.sender, address(this), _id[i]);
        }
    }

    function depositBeta(uint256[] calldata _id) public{

        for(uint256 i=0; i < _id.length; i++){
            require(claimContract.betaClaimed(_id[i]) == false, "Token has been claimed");
        }
        
        for(uint256 i=0; i < _id.length; i++){
            MAYC[MAYCcount++] = _MAYC(
                                    msg.sender,
                                    _id[i]
                                );

            BETA.transferFrom(msg.sender, address(this), _id[i]);
        }
    }

    //Deposit KENNEL into contract.
    //Creates child contract on deposit
    function depositGamma(uint256[] calldata _id) public{
        for(uint256 i=0; i < _id.length; i++){
            require(claimContract.gammaClaimed(_id[i]) == false, "Token has been claimed");
        }
        
        for(uint256 i=0; i < _id.length; i++){
            child[++count] = new ChildContract(msg.sender, _id[i], address(this));

            children[count] = Details(address(child[count]),msg.sender,_id[i],_FILLERWALLET,0,false);

            GAMMA.transferFrom(msg.sender, address(child[count]), _id[i]);
        }
    }

    //Matching Kennels
    //Creates new child contract, moves existing APE from this contract to child, to claim.
    function matchGammaBAYC(uint256[] calldata _id, uint256[] calldata _idBAYC) public{
        for(uint256 i=0; i < _id.length; i++){
            require(claimContract.gammaClaimed(_id[i]) == false, "Token has been claimed");
        }

        for(uint256 i=0; i < _id.length; i++){
            child[++count] = new ChildContract(msg.sender, _id[i], address(this));

            GAMMA.transferFrom(msg.sender, address(child[count]), _id[i]);
            ALPHA.transferFrom(address(this), address(child[count]), BAYC[_idBAYC[i]].tokenID);
            
            child[count].setType();
            child[count].setSecondary(BAYC[_idBAYC[i]].wallet,BAYC[_idBAYC[i]].tokenID);
            child[count].claim();
        }
        
        
    }

    function matchGammaMAYC(uint256[] calldata _id, uint256[] calldata _idMAYC) public{
        for(uint256 i=0; i < _id.length; i++){
            require(claimContract.gammaClaimed(_id[i]) == false, "Token has been claimed");
        }

        for(uint256 i=0; i < _id.length; i++){
            child[++count] = new ChildContract(msg.sender, _id[i], address(this));

            GAMMA.transferFrom(msg.sender, address(child[count]), _id[i]);
            BETA.transferFrom(address(this), address(child[count]), MAYC[_idMAYC[i]].tokenID);

            child[count].setSecondary(MAYC[_idMAYC[i]].wallet,MAYC[_idMAYC[i]].tokenID);
            child[count].claim();
        }
    }
    

    //MATCHING APES TO KENNEL CONTRACTS
    function matchAlpha(uint[] calldata _contract, uint256[] calldata _id) public{
        require(_contract.length == _id.length, "Not enough tokens or contracts");

        for(uint256 i=0; i < _id.length; i++){
            require(claimContract.alphaClaimed(_id[i]) == false, "Token has been claimed");
        }

        for(uint256 i=0; i < _id.length; i++){
            ALPHA.transferFrom(msg.sender, address(child[_contract[i] ]), _id[i]);

            children[_contract[i] ]._apeOwner = msg.sender;
            children[_contract[i] ]._apeID = _id[i];
            children[_contract[i] ].filled = true;

            child[_contract[i] ].setType();
            child[_contract[i] ].setSecondary(msg.sender,_id[i]);
            child[_contract[i] ].claim();
        }
    }

    function matchBeta(uint[] calldata _contract, uint256[] calldata _id) public{
        require(_contract.length == _id.length, "Not enough tokens or contracts");

        for(uint256 i=0; i < _id.length; i++){
            require(claimContract.betaClaimed(_id[i]) == false, "Token has been claimed");
        }

        for(uint256 i=0; i < _id.length; i++){
            BETA.transferFrom(msg.sender, address(child[_contract[i] ]), _id[i]);

            children[_contract[i] ]._apeOwner = msg.sender;
            children[_contract[i] ]._apeID = _id[i];
            children[_contract[i] ].filled = true;

            child[_contract[i] ].setType();
            child[_contract[i] ].setSecondary(msg.sender,_id[i]);
            child[_contract[i] ].claim();
        }
    }

    function withdrawAlpha(uint256 tokenId, uint256 _index) external{
        require(BAYC[_index].wallet == msg.sender, "Token is not yours");
        ALPHA.safeTransferFrom(address(this), msg.sender, tokenId);
    }

    function withdrawBeta(uint256 tokenId, uint256 _index) external{
        require(MAYC[_index].wallet == msg.sender, "Token is not yours");
        BETA.safeTransferFrom(address(this), msg.sender, tokenId);
    }
    
    function flagContract(uint256 _id) external{
        children[count].filled = true;
    }

    function setClaimContract(address _grapes) public {
        claimContract = deployedContract(_grapes);
    }

    function getBAYCcount() public view returns(uint) {
        return BAYCcount;
    }

    function getMAYCcount() public view returns(uint) {
        return MAYCcount;
    }

    function getChildCount() public view returns(uint) {
        return count;
    }
}