import React, { useEffect } from 'react';
import './style.css';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';

function Header({ login, logout }) {
  const Web3Api = useMoralisWeb3Api();
  const {
    authenticate,
    Moralis,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
  } = useMoralis();
  //   Moralis.start({
  //     serverUrl: 'https://hbaxqvdys0wy.usemoralis.com:2053/server',
  //     appId: 'Yvx136Iyms1tooQ1lQnjqf1bDO9PotbxuzmtABKk',
  //   });

  //   const fetchNFTsForContract = async () => {
  //     const options = {
  //       chain: 'mumbai',
  //       address: account,
  //       token_address: '0x9f20136fdf1d701a2f6b95cee36f41296ce97e32',
  //     };
  //     const polygonNFTs = await Web3Api.account.getNFTsForContract(options);
  //     console.log(polygonNFTs);
  //   };

  //     useEffect(() => {
  //         fetchNFTsForContract();
  //     }, [account]);

  return (
    <div
      data-animation="default"
      data-collapse="small"
      data-duration="400"
      data-easing="ease"
      data-easing2="ease"
      role="banner"
      className="nav w-nav"
    >
      <div className="nav-grid">
        <div className="nav-menu-button w-nav-button">
          <div className="w-icon-nav-menu"></div>
        </div>
        <div id="wallet_connect" className="flex-horizontal flex-right z-100">
          <button
            onClick={() => {
              logout();
              login();
              //   account ? logout() : login();
              console.log('amen', account, user);
            }}
            className="button w-button"
          >
            {account ? 'Disconnect' : 'Connect Wallet'}
          </button>
        </div>
        <nav role="navigation" className="nav-menu w-nav-menu">
          <div className="nav-menu-list">
            <a
              href="index.html"
              aria-current="page"
              rel="noreferrer"
              className="nav-item w-nav-link w--current"
            >
              Matcher
            </a>
            <a href="#" rel="noreferrer" className="nav-item w-nav-link">
              Learn
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
