import React, { useEffect, useState, useCallback } from 'react';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';

import Config from '../../config/config';

function BoredApe({ login, logout }) {
  const Web3Api = useMoralisWeb3Api();

  const [bayc, setBayc] = useState([]);
  //   selected apes
  const [ape, setApe] = useState([]);
  //   eligible aoes
  const [bapes, setBapes] = useState([]);
  const [deposit, setDeposit] = useState(false);

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

  const daiAddress = '0x26231e65A13578F75279dCEB6eea2CEECE9Ee620';
  const daiAbi = [
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256',
        },
      ],
      name: 'AirDrop',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256',
        },
      ],
      name: 'AlphaClaimed',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256',
        },
      ],
      name: 'BetaClaimed',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: '_claimDuration',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: '_claimStartTime',
          type: 'uint256',
        },
      ],
      name: 'ClaimStart',
      type: 'event',
    },
    {
      inputs: [],
      name: 'claimTokens',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'claimUnclaimedTokens',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256',
        },
      ],
      name: 'GammaClaimed',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'OwnershipTransferred',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'Paused',
      type: 'event',
    },
    {
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_claimDuration',
          type: 'uint256',
        },
      ],
      name: 'startClaimablePeriod',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'Unpaused',
      type: 'event',
    },
    {
      inputs: [],
      name: 'alpha',
      outputs: [
        {
          internalType: 'contract ERC721Enumerable',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'ALPHA_DISTRIBUTION_AMOUNT',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'alphaClaimed',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'beta',
      outputs: [
        {
          internalType: 'contract ERC721Enumerable',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'BETA_DISTRIBUTION_AMOUNT',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'betaClaimed',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'claimDuration',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'claimStartTime',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'gamma',
      outputs: [
        {
          internalType: 'contract ERC721Enumerable',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'GAMMA_DISTRIBUTION_AMOUNT',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'gammaClaimed',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_account',
          type: 'address',
        },
      ],
      name: 'getClaimableTokenAmount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_account',
          type: 'address',
        },
      ],
      name: 'getClaimableTokenAmountAndGammaToClaim',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'grapesToken',
      outputs: [
        {
          internalType: 'contract IERC20',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'paused',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'totalClaimed',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
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

  const parentAbi = [
    { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
    {
      inputs: [],
      name: 'ALPHA',
      outputs: [
        {
          internalType: 'contract ERC721Enumerable',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      name: 'BAYC',
      outputs: [
        { internalType: 'address', name: 'wallet', type: 'address' },
        { internalType: 'uint256', name: 'tokenID', type: 'uint256' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'BETA',
      outputs: [
        {
          internalType: 'contract ERC721Enumerable',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'GAMMA',
      outputs: [
        {
          internalType: 'contract ERC721Enumerable',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      name: 'MAYC',
      outputs: [
        { internalType: 'address', name: 'wallet', type: 'address' },
        { internalType: 'uint256', name: 'tokenID', type: 'uint256' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      name: 'child',
      outputs: [
        { internalType: 'contract ChildContract', name: '', type: 'address' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '_id', type: 'uint256' }],
      name: 'depositAlpha',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '_id', type: 'uint256' }],
      name: 'depositBeta',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '_id', type: 'uint256' }],
      name: 'depositGamma',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: '_contract', type: 'uint256' },
        { internalType: 'uint256', name: '_id', type: 'uint256' },
      ],
      name: 'matchAlpha',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: '_contract', type: 'uint256' },
        { internalType: 'uint256', name: '_id', type: 'uint256' },
      ],
      name: 'matchBeta',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: '_id', type: 'uint256' },
        { internalType: 'uint256', name: '_idBAYC', type: 'uint256' },
      ],
      name: 'matchGammaBAYC',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: '_id', type: 'uint256' },
        { internalType: 'uint256', name: '_idMAYC', type: 'uint256' },
      ],
      name: 'matchGammaMAYC',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '_grapes', type: 'address' }],
      name: 'setClaimContract',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        { internalType: 'uint256', name: '_index', type: 'uint256' },
      ],
      name: 'withdrawAlpha',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        { internalType: 'uint256', name: '_index', type: 'uint256' },
      ],
      name: 'withdrawBeta',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ];

  const parentAddress = '0xA31aA8F02E5B7dCCbF865A8b58C9955b2f6D5183';

  const depositBayc = async () => {
    try {
      const web3Provider = Moralis.web3;
      const contract = new ethers.Contract(
        parentAddress,
        parentAbi,
        web3Provider
      );
      const alphaContract = new ethers.Contract(
        Config.BAYC_ADDRESS,
        daiAbi,
        web3Provider
      );
      const signer = web3Provider.getSigner();
      const instance = await contract.connect(signer);

      const transaction = await instance.depositAlpha(9, {
        gasLimit: '100000',
      });

      await transaction.wait();

      console.log('Deposited', transaction);
    } catch (error) {
      console.log(error);
    }
  };

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
    }
  }, [isAuthenticated]);

  const chooseApe = (id) => {
    setApe([...ape, id]);
  };

  const deselect = (id) => {
    const i = ape.filter((x) => x !== id);
    setApe(i);
  };

  useEffect(() => {
    console.log(ape, 'apessssssss');
  }, [ape]);

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
                {account && bayc.length > 1 && (
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
                {account && !deposit && bayc.length > 1 && (
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
                {account && deposit && (
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
                          <button className="deposited-box_button">
                            claim
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
                {!account && (
                  <div style={{ color: '#ffffff', height: "100%", display: "flex", alignItems: "center" }}>
                    Please connect your wallet
                  </div>
                )}
              </div>
              {account ? (
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
              )
                :
                (
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
