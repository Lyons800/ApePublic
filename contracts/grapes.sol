// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

import "hardhat/console.sol";

contract grapes is Ownable, Pausable {

    using SafeERC20 for IERC20;
    IERC20 public immutable grapesToken = IERC20(0xeFBa384c8106E677b496cFa3afD05Cb7F8fD6D70);

    ERC721Enumerable public alpha = ERC721Enumerable(0x8f2495Bdc0cfe864B5098bdE25698511a1973Af7);
    ERC721Enumerable public beta = ERC721Enumerable(0xD7eeB4B6e97700c8dba03B897f8BA8b8ed39E1fd);
    ERC721Enumerable public gamma = ERC721Enumerable(0x069225faBD2f7bEA2Fa32Bdf1A035C0311Bd7BE0);

    uint256 public ALPHA_DISTRIBUTION_AMOUNT = 10094000000000000000000;
    uint256 public BETA_DISTRIBUTION_AMOUNT = 2042000000000000000000;
    uint256 public GAMMA_DISTRIBUTION_AMOUNT = 856000000000000000000;

    uint256 public totalClaimed;

    uint256 public claimDuration;
    uint256 public claimStartTime;

    mapping (uint256 => bool) public alphaClaimed;
    mapping (uint256 => bool) public betaClaimed;
    mapping (uint256 => bool) public gammaClaimed;

    event ClaimStart(
        uint256 _claimDuration,
        uint256 _claimStartTime
    );

    event AlphaClaimed(
        uint256 indexed tokenId,
        address indexed account,
        uint256 timestamp
    );

    event BetaClaimed(
        uint256 indexed tokenId,
        address indexed account,
        uint256 timestamp
    );

    event GammaClaimed(
        uint256 indexed tokenId,
        address indexed account,
        uint256 timestamp
    );

    event AirDrop(
        address indexed account,
        uint256 indexed amount,
        uint256 timestamp
    );


    constructor(
    ) {
    }

    function startClaimablePeriod(uint256 _claimDuration) external onlyOwner  {
        //require(_claimDuration > 0, "Claim duration should be greater than 0");

        claimDuration = _claimDuration;
        claimStartTime = block.timestamp;

        emit ClaimStart(_claimDuration, claimStartTime);
    }



    function claimTokens() external {
        //require(block.timestamp >= claimStartTime && block.timestamp < claimStartTime + claimDuration, "Claimable period is finished");
        require((beta.balanceOf(msg.sender) > 0 || alpha.balanceOf(msg.sender) > 0), "Nothing to claim");

        uint256 tokensToClaim;
        uint256 gammaToBeClaim;

        (tokensToClaim, gammaToBeClaim) = getClaimableTokenAmountAndGammaToClaim(msg.sender);

        for(uint256 i; i < alpha.balanceOf(msg.sender); ++i) {
            uint256 tokenId = alpha.tokenOfOwnerByIndex(msg.sender, i);
            if(!alphaClaimed[tokenId]) {
                alphaClaimed[tokenId] = true;
                emit AlphaClaimed(tokenId, msg.sender, block.timestamp);
            }
        }

        for(uint256 i; i < beta.balanceOf(msg.sender); ++i) {
            uint256 tokenId = beta.tokenOfOwnerByIndex(msg.sender, i);
            if(!betaClaimed[tokenId]) {
                betaClaimed[tokenId] = true;
                emit BetaClaimed(tokenId, msg.sender, block.timestamp);
            }
        }

        uint256 currentGammaClaimed;
        for(uint256 i; i < gamma.balanceOf(msg.sender); ++i) {
            uint256 tokenId = gamma.tokenOfOwnerByIndex(msg.sender, i);
            if(!gammaClaimed[tokenId] && currentGammaClaimed < gammaToBeClaim) {
                gammaClaimed[tokenId] = true;
                emit GammaClaimed(tokenId, msg.sender, block.timestamp);
                currentGammaClaimed++;
            }
        }

        grapesToken.transfer(msg.sender, tokensToClaim);

        totalClaimed += tokensToClaim;
        emit AirDrop(msg.sender, tokensToClaim, block.timestamp);
    }

    function getClaimableTokenAmount(address _account) public view returns (uint256) {
        uint256 tokensAmount;
        (tokensAmount,) = getClaimableTokenAmountAndGammaToClaim(_account);
        return tokensAmount;
    }

    function getClaimableTokenAmountAndGammaToClaim(address _account) public view returns (uint256, uint256)
    {
        uint256 unclaimedAlphaBalance;
        for(uint256 i; i < alpha.balanceOf(_account); ++i) {
            
            uint256 tokenId = alpha.tokenOfOwnerByIndex(_account, i);

            if(!alphaClaimed[tokenId]) {
                ++unclaimedAlphaBalance;
            }
        }
        uint256 unclaimedBetaBalance;
        for(uint256 i; i < beta.balanceOf(_account); ++i) {
            uint256 tokenId = beta.tokenOfOwnerByIndex(_account, i);
            if(!betaClaimed[tokenId]) {
                ++unclaimedBetaBalance;
            }
        }
        uint256 unclaimedGamaBalance;
        for(uint256 i; i < gamma.balanceOf(_account); ++i) {
            uint256 tokenId = gamma.tokenOfOwnerByIndex(_account, i);
            if(!gammaClaimed[tokenId]) {
                ++unclaimedGamaBalance;
            }
        }

        uint256 gammaToBeClaim = min(unclaimedAlphaBalance + unclaimedBetaBalance, unclaimedGamaBalance);
        uint256 tokensAmount = (unclaimedAlphaBalance * ALPHA_DISTRIBUTION_AMOUNT)
        + (unclaimedBetaBalance * BETA_DISTRIBUTION_AMOUNT) + (gammaToBeClaim * GAMMA_DISTRIBUTION_AMOUNT);

        return (tokensAmount, gammaToBeClaim);
    }

    function min(uint256 a, uint256 b) private pure returns(uint256) {
        if (a <= b) {
            return a;
        } else {
            return b;
        }
    }

    function claimUnclaimedTokens() external onlyOwner {
        //require(block.timestamp > claimStartTime + claimDuration, "Claimable period is not finished yet");
        grapesToken.safeTransfer(owner(), grapesToken.balanceOf(address(this)));

        uint256 balance = address(this).balance;
        if (balance > 0) {
            Address.sendValue(payable(owner()), balance);
        }
    }
}