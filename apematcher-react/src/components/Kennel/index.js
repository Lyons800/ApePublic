import React, { useEffect, useState, useCallback } from 'react';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';

import ParentAbi from '../../config/parentAbi';
import Config from '../../config/config';

function Kennel({ login, logout }) {
  const Web3Api = useMoralisWeb3Api();

  // apes from nft api
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

  const mutantAddress = '';
  const mutantAbi = '';

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

  const depositBayc = async () => {
    const web3Provider = Moralis.web3;
    const contract = new ethers.Contract(
      Config.PARENT_ADDRESS,
      ParentAbi,
      web3Provider
    );
    const signer = web3Provider.getSigner();
    const instance = await contract.connect(signer);

    const transaction = await instance.depositBeta(2, {
      gasLimit: '100000',
    });

    await transaction.wait();

    console.log('Deposited', transaction);
  };

  const fetchNFTsForContract = async () => {
    const options = {
      chain: 'rinkeby',
      address: account,
      token_address: '0x8f2495Bdc0cfe864B5098bdE25698511a1973Af7',
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
                {account && account && !deposit && bayc.length > 1 && (
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
              {
                account ? (
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
