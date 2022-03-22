import './style.css';
import React from 'react';
import { useMoralis } from 'react-moralis';

import Header from '../Header';
import BoredApe from '../BoredApe';
import MutantApe from '../MutantApe';
import Kennel from '../Kennel';

function Accordion() {
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    Moralis,
    logout,
  } = useMoralis();

  Moralis.start({
    serverUrl: 'https://hbaxqvdys0wy.usemoralis.com:2053/server',
    appId: 'Yvx136Iyms1tooQ1lQnjqf1bDO9PotbxuzmtABKk',
  });

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: 'Log in using Moralis' })
        .then(function (user) {
          console.log('logged in user:', user);
          console.log(user?.get('ethAddress'));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const logOut = async () => {
    await logout();
    console.log('logged out');
  };

  return (
    <div className="accordion-container">
      <Header login={login} logout={logOut} />
      <BoredApe login={login} logout={logOut}/>
      <MutantApe login={login} logout={logOut}/>
      <Kennel />
    </div>
  );
}

export default Accordion;
