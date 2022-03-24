export const PARENT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "ALPHA",
    "outputs": [
      {
        "internalType": "contract ERC721Enumerable",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "BAYC",
    "outputs": [
      {
        "internalType": "address",
        "name": "wallet",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenID",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "BETA",
    "outputs": [
      {
        "internalType": "contract ERC721Enumerable",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "GAMMA",
    "outputs": [
      {
        "internalType": "contract ERC721Enumerable",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "MAYC",
    "outputs": [
      {
        "internalType": "address",
        "name": "wallet",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenID",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "child",
    "outputs": [
      {
        "internalType": "contract ChildContract",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "children",
    "outputs": [
      {
        "internalType": "address",
        "name": "_childAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_kennelOwner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_kennelID",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_apeOwner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_apeID",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "filled",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "_id",
        "type": "uint256[]"
      }
    ],
    "name": "depositAlpha",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "_id",
        "type": "uint256[]"
      }
    ],
    "name": "depositBeta",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "_id",
        "type": "uint256[]"
      }
    ],
    "name": "depositGamma",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "flagContract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBAYCcount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getChildCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMAYCcount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "_contract",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_id",
        "type": "uint256[]"
      }
    ],
    "name": "matchAlpha",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "_contract",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_id",
        "type": "uint256[]"
      }
    ],
    "name": "matchBeta",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "_id",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_idBAYC",
        "type": "uint256[]"
      }
    ],
    "name": "matchGammaBAYC",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "_id",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_idMAYC",
        "type": "uint256[]"
      }
    ],
    "name": "matchGammaMAYC",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_grapes",
        "type": "address"
      }
    ],
    "name": "setClaimContract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "withdrawAlpha",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "withdrawBeta",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
