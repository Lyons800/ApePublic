import React, { useEffect, useState, useCallback } from 'react';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';

import { PARENT_ABI } from '../../config/parentAbi';
import Config from '../../config/config';
import { APE_ABI } from '../../config/apeTokenAbi';

function Kennel({ login, logout }) {
  const Web3Api = useMoralisWeb3Api();

  // apes from nft api
  const [bayc, setBayc] = useState([]);
  //   selected apes
  const [ape, setApe] = useState([]);
  const [apeIds, setApeIds] = useState([])
  //   eligible aoes
  const [bapes, setBapes] = useState([]);
  const [deposit, setDeposit] = useState(false);
  const [isTx, setIsTx] = useState(false)

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

  const mutantAddress = '';
  const mutantAbi = '';

  const parentAddress = '0x4484983C2be8b0Af364b871521172D7C4E8C1D51';

  const checkEligibility = async () => {
    // console.log(ape, 'selected apes');
    const web3Provider = Moralis.web3;
    const contract = new ethers.Contract(
      mutantAddress,
      mutantAbi,
      web3Provider
    );

    ape.map(async (item) => {
      //   console.log(item, 'Asas');
      const isRevealed = await contract.betaClaimed(item.token_id);
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

  const handleApprove = async (ape_instance) => {
    const approveStatus = await ape_instance.isApprovedForAll(account, parentAddress)
    if(!approveStatus) {
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
        ape[0].token_address,
        APE_ABI,
        web3Provider
      );

      const signer = web3Provider.getSigner();

      const ape_instance = await ape_contract.connect(signer);
      await handleApprove(ape_instance)

      const instance = await contract.connect(signer);
  
      const transaction = await instance.depositGamma(ape[0].token_id);
  
      setIsTx(true)
      await transaction.wait();
      setIsTx(false)
  
      console.log('Deposited', transaction);
    } catch(error) {
      console.log(error);
      setIsTx(false)
    }
    
  };

  const fetchNFTsForContract = async () => {
    const options = {
      chain: 'rinkeby',
      address: account,
      token_address: Config.KENNLEL_ADDRESS,
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
    setApeIds([...apeIds, id.token_id])
  };

  const deselect = (id) => {
    const i = ape.filter((x) => x !== id);
    const ids = apeIds.filter((x) => x !== id.token_id);
    setApe(i);
    setApeIds([...ids])
  };

  useEffect(() => {
    console.log(ape, 'apessssssss');
  }, [ape]);
  return (
    <div
      data-hover="false"
      data-delay="0"
      id="accordion3"
      data-w-id="accordion3-dropdown"
      className="accordion w-dropdown"
    >
      <div id="toggle3" className="accordion-toggle w-dropdown-toggle">
        <div className="accordion-toggle-grid">
          <div className="accordion-header">03</div>
          <h2 id="accordion3-title" className="accordion-header">
            <strong>Kennel </strong>
          </h2>
          <div id="accordion3-description" className="break-normal">
            Kennel club owners get a free 171 $APE
          </div>
          <div id="accordion3-icon" className="accordion-icon">
            <div className="icon-line-static"></div>
            <div className="icon-line"></div>
          </div>
        </div>
      </div>
      <nav className="accordion-content w-dropdown-list">
        <div className="accordion-content-grid">
          <div id="accordion3-content1-wrap" className="accordion-content-wrap">
            <div id="a3-jump1" className="accordion-content-jump"></div>
            <div className="bayc_display_wrapper">
              <div className="bayc_content">
                {account && bayc.length > 0 && (
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
                  </div>
                )}
                {account && isTx && (
                  <div style={{ color: '#ffffff', height: "100%", display: "flex", alignItems: "center" }}>
                    Please check the transaction in your wallet
                  </div>
                )}
                {!account && (
                  <div style={{ color: '#ffffff', height: "100%", display: "flex", alignItems: "center" }}>
                    Please connect your wallet
                  </div>
                )}
              </div>
              {
                account ? ape.length > 0 && (
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

export default Kennel;
