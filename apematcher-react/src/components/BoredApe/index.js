import React, { useEffect, useState, useCallback } from 'react';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';

import Config from '../../config/config';
import { PARENT_ABI } from "../../config/parentAbi"
import { APE_ABI } from '../../config/apeTokenAbi';

function BoredApe({ login, logout }) {
  const Web3Api = useMoralisWeb3Api();

  const [bayc, setBayc] = useState([]);
  const [depositedBayc, setDepositedBayc] = useState([]);
  //   selected apes
  const [ape, setApe] = useState([]);
  const [apeIds, setApeIds] = useState([])
  //   eligible aoes
  const [bapes, setBapes] = useState([]);
  const [deposit, setDeposit] = useState(false);
  const [isTx, setIsTx] = useState(false)
  const [baycCount, setBaycCount] = useState(0)

  const {
    authenticate,
    Moralis,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
  } = useMoralis();
  Moralis.start({
    serverUrl: 'https://hbaxqvdys0wy.usemoralis.com:2053/server',
    appId: 'Yvx136Iyms1tooQ1lQnjqf1bDO9PotbxuzmtABKk',
  });

  const ethers = Moralis.web3Library;

  const daiAddress = '0x4347E543f90a51C5A0FFA6443C32B9fbb9e04ECe';
  const daiAbi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "AirDrop",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "AlphaClaimed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "BetaClaimed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_claimDuration",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_claimStartTime",
          "type": "uint256"
        }
      ],
      "name": "ClaimStart",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "GammaClaimed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "ALPHA_DISTRIBUTION_AMOUNT",
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
      "name": "BETA_DISTRIBUTION_AMOUNT",
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
      "name": "GAMMA_DISTRIBUTION_AMOUNT",
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
      "name": "alpha",
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
      "name": "alphaClaimed",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "beta",
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
      "name": "betaClaimed",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "claimDuration",
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
      "name": "claimStartTime",
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
      "name": "claimTokens",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "claimUnclaimedTokens",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "gamma",
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
      "name": "gammaClaimed",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_account",
          "type": "address"
        }
      ],
      "name": "getClaimableTokenAmount",
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
          "internalType": "address",
          "name": "_account",
          "type": "address"
        }
      ],
      "name": "getClaimableTokenAmountAndGammaToClaim",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
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
      "name": "grapesToken",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_claimDuration",
          "type": "uint256"
        }
      ],
      "name": "startClaimablePeriod",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalClaimed",
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
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  const checkEligibility = async () => {
    // console.log(ape, 'selected apes');
    const web3Provider = Moralis.web3;
    const contract = new ethers.Contract(daiAddress, daiAbi, web3Provider);

    ape.map(async (item) => {
      //   console.log(item, 'Asas');
      const isRevealed = await contract.alphaClaimed(item.token_id);
      if (!isRevealed) {
        const i = bapes.find((x) => x.token_id === item.token_id);
        console.log(i, isRevealed, 'reve');

        if (i === undefined) {
          setBapes([...bapes, item]);
          console.log(i, bapes, 'asasnbapes', isRevealed);
        }
      }
    });
  };

  useEffect(() => {
    console.log(bapes);
  }, [bapes]);

  const parentAddress = '0x4484983C2be8b0Af364b871521172D7C4E8C1D51';

  const handleGetBayc = async () => {
    const web3Provider = Moralis.web3;
    const contract = new ethers.Contract(
      parentAddress,
      PARENT_ABI,
      web3Provider
    );
    const signer = web3Provider.getSigner();

    const parent_instance = await contract.connect(signer);
    let baycCount = await parent_instance.getBAYCcount()
    console.log(baycCount.toNumber())
    setBaycCount(baycCount.toNumber())
  }

  const handleApprove = async (ape_instance) => {
    const approveStatus = await ape_instance.isApprovedForAll(account, parentAddress)
    if (!approveStatus) {
      const approve = await ape_instance.setApprovalForAll(parentAddress, true)
      await approve.wait()
      return;
    } else {
      return;
    }
  }

  const depositBayc = async () => {
    try {
      const web3Provider = Moralis.web3;
      const contract = new ethers.Contract(
        parentAddress,
        PARENT_ABI,
        web3Provider
      );

      const ape_contract = new ethers.Contract(
        Config.BAYC_ADDRESS,
        APE_ABI,
        web3Provider
      );
      const alphaContract = new ethers.Contract(
        Config.BAYC_ADDRESS,
        daiAbi,
        web3Provider
      );
      let depositTokenIDs = [];
      ape.map(item => {
        depositTokenIDs.push(item.token_id)
      })

      const signer = web3Provider.getSigner();

      const ape_instance = await ape_contract.connect(signer);
      await handleApprove(ape_instance)

      const instance = await contract.connect(signer);

      const transaction = await instance.depositAlpha(depositTokenIDs);

      setIsTx(true)
      await transaction.wait();
      setIsTx(false)
      console.log('Deposited', transaction);
    } catch (error) {
      console.log(error);
      setIsTx(false)
    }
  };

  const withdrawBayc = async (tokenID, id) => {
    try {
      const web3Provider = Moralis.web3;
      const contract = new ethers.Contract(
        parentAddress,
        PARENT_ABI,
        web3Provider
      );
  
      const signer = web3Provider.getSigner();
      const instance = await contract.connect(signer);
      const transaction = await instance.withdrawAlpha(tokenID, id);
  
      setIsTx(true)
      await transaction.wait();
      setIsTx(false)
    } catch(e) {
      console.log(e)
      setIsTx(false)
    }
    
  }

  const fetchNFTsForContract = async () => {
    const options = {
      chain: 'rinkeby',
      address: account,
      token_address: Config.BAYC_ADDRESS,
    };
    const nfts = await Web3Api.account.getNFTsForContract(options);
    setBayc(nfts.result);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchNFTsForContract();
      handleGetBayc();
    }
  }, [isAuthenticated]);

  const chooseApe = (id) => {
    setApe([...ape, id]);
    setApeIds([...apeIds, id.token_id])
  };

  const deselect = (id) => {
    const i = ape.filter((x) => x !== id);
    const ids = apeIds.filter((x) => x !== id.token_id);
    setApe(i);
    setApeIds([...ids])
  };

  const getBAYCdetails = async (contract, index) => {
    let bayc = await contract.BAYC(index)
    return {bayc, index};
  }

  useEffect(async () => {
    if (baycCount === 0) {
      return;
    }

    const web3Provider = Moralis.web3;
    const contract = new ethers.Contract(
      parentAddress,
      PARENT_ABI,
      web3Provider
    );

    const signer = web3Provider.getSigner();
    const instance = await contract.connect(signer);

    const promises = [];
    for (let i = 0; i < baycCount; i++) {
      promises.push(getBAYCdetails(instance, i))
    }

    let allBAYC = await Promise.all(promises).then((result) => {
      return result
    })
      .catch((e) => {
        console.log(e)
      })
    let baycIDs = [];
    allBAYC.map(item => {
      baycIDs.push(item.bayc.tokenID.toNumber().toString())
    })

    const options = {
      chain: 'rinkeby',
      address: parentAddress,
      token_address: Config.BAYC_ADDRESS,
    };
    const nfts = await Web3Api.account.getNFTsForContract(options);
    var filtered = nfts.result.filter(function (item) {
      if(baycIDs.indexOf(item.token_id) !== -1) {
        let original = [];
        let matchedBayc = allBAYC.filter(bayc => bayc.bayc.tokenID.toNumber().toString() === item.token_id)
        item["bayc_id"] = matchedBayc[0].index
        original.push(item)
        return original
      }
    });
    setDepositedBayc(filtered)
  }, [baycCount])

  return (
    <div
      data-hover="false"
      data-delay="0"
      id="accordion1"
      data-w-id="accordion1-dropdown"
      className="accordion w-dropdown"
    >
      <div id="toggle1" className="accordion-toggle w-dropdown-toggle">
        <div className="accordion-toggle-grid">
          <div className="accordion-header">01</div>
          <h2 id="accordion1-title" className="accordion-header">
            <strong className="black-text">Bored ape</strong>
          </h2>
          <div id="accordion1-description" className="break-normal">
            Bored apes earn an extra 513 $APE
          </div>
          <div id="accordion1-icon" className="accordion-icon">
            <div className="icon-line-static"></div>
            <div className="icon-line"></div>
          </div>
        </div>
      </div>
      <nav className="accordion-content w-dropdown-list">
        <div className="accordion-content-grid">
          <div id="accordion1-content1-wrap" className="accordion-content-wrap">
            <div id="a1-jump1" className="accordion-content-jump"></div>
            <div className="bayc_display_wrapper">
              <div className="bayc_content">
                {account && !isTx && bayc.length > 0 && (
                  <div className="emptyNft_box">
                    <div className="emptyNft_box"></div>
                    <h4 className="bayc_display_notice">
                      {bapes.length > 1
                        ? 'Eligible BAYC'
                        : 'BAYC frm your wallet'}
                    </h4>
                  </div>
                )}

                {/* {bayc.length < 1 &&  !deposit */}
                {account && !isTx && !deposit && bayc.length > 0 && (
                  <div className="scroll-box__container" role="list">
                    {bapes.length > 1
                      ? bapes.map((item) => {
                        const token = ape.find((x) => x === item.token_id);

                        return (
                          <div
                            key={item.token_id}
                            className={` bayc_box ${token ? 'selected' : ''}`}
                            onClick={() => {
                              let d = ape.find(
                                (r) => r.token_id === item.token_id
                              );
                              if (!d) {
                                chooseApe(item);
                              } else {
                                deselect(item);
                              }
                            }}
                          >
                            <img
                              src={`https://ipfs.moralis.io:2053/ipfs/${item &&
                                JSON.parse(item.metadata)?.image.substring(7)
                                }`}
                              alt="asas"
                            />
                            <p className="deposited-box_title">
                              {item.token_id}
                            </p>
                          </div>
                        );
                      })
                      : bayc.map((item) => {
                        const token = ape.find(
                          (x) => x.token_id === item.token_id
                        );

                        return (
                          <div
                            key={item.token_id}
                            className={` bayc_box ${token ? 'selected' : ''}`}
                            onClick={() => {
                              let d = ape.find(
                                (r) => r.token_id === item.token_id
                              );
                              if (!d) {
                                chooseApe(item);
                              } else {
                                deselect(item);
                              }
                            }}
                          >
                            <img
                              src={`https://ipfs.moralis.io:2053/ipfs/${item &&
                                JSON.parse(item.metadata)?.image.substring(7)
                                }`}
                              alt="asas"
                            />
                            <p className="deposited-box_title">
                              {item.token_id}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                )}
                {/* } */}
                {account && !isTx && deposit && (
                  <div className="deposited-box__container" role="list">
                    {bayc.map((item) => {
                      return (
                        <div className="deposited-box" key={item.token_id}>
                          <div className="deposited-box_group">
                            <div className="deposited-box_image">
                              <img
                                src={`https://ipfs.moralis.io:2053/ipfs/${item &&
                                  JSON.parse(item.metadata)?.image.substring(7)
                                  }`}
                                alt="asas"
                              />
                            </div>
                            <p className="deposited-box_title">
                              {item.name}#{item.token_id}
                            </p>
                          </div>
                          <button className="deposited-box_button"
                            onClick={() => {
                              let d = ape.find(
                                (r) => r.token_id === item.token_id
                              );
                              if (!d) {
                                chooseApe(item);
                              } else {
                                deselect(item);
                              }
                            }}>
                            {
                              apeIds.indexOf(item.token_id) > -1 ? (
                                <>
                                  Selected
                                </>
                              )
                                :
                                (
                                  <>
                                    Select
                                  </>
                                )
                            }
                          </button>
                        </div>
                      );
                    })}
                    {depositedBayc.map((item) => {
                      return (
                        <div className="deposited-box" key={item.token_id}>
                          <div className="deposited-box_group">
                            <div className="deposited-box_image">
                              <img
                                src={`https://ipfs.moralis.io:2053/ipfs/${item &&
                                  JSON.parse(item.metadata)?.image.substring(7)
                                  }`}
                                alt="asas"
                              />
                            </div>
                            <p className="deposited-box_title">
                              {item.name}#{item.token_id}
                            </p>
                          </div>
                          <button className="deposited-box_button"
                            onClick={() => withdrawBayc(item.token_id, item.bayc_id)}>
                            {
                              apeIds.indexOf(item.token_id) > -1 ? (
                                <>
                                  Claim
                                </>
                              )
                                :
                                (
                                  <>
                                    Withdraw
                                  </>
                                )
                            }
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
                {account && isTx && (
                  <div style={{ color: '#ffffff', height: "100%", display: "flex", alignItems: "center" }}>
                    Please confirm the transaction in your wallet
                  </div>
                )}
                {!account && (
                  <div style={{ color: '#ffffff', height: "100%", display: "flex", alignItems: "center" }}>
                    Please connect your wallet
                  </div>
                )}
              </div>
              {account && !isTx && ape.length > 0 && (
                <div className="bayc_button">
                  {/* {bapes.length < 0 && ( */}
                  {/* <button
                    onClick={() => {
                      checkEligibility();
                    }}
                    className="btn_check"
                  >
                    Check Elligibility
                  </button> */}
                  {/* )} */}
                  <button
                    className="btn_deposit"
                    onClick={() => {
                      depositBayc();
                      setDeposit(true);
                    }}
                  >
                    Deposit
                  </button>
                </div>
              )}
              {
                !account && (
                  <div className="bayc_button">
                    <button
                      className="btn_connect"
                      onClick={() => {
                        logout()
                        login()
                      }}
                    >
                      Connect
                    </button>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default BoredApe;
