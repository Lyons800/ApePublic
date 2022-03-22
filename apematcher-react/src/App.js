import { useEffect } from 'react';
import './App.css';
import Background from './components/Background';
import Accordion from './components/Accordion';
import SideBar from './components/SideBar';
import { useMoralis } from 'react-moralis';

function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/js/webflow.js';
    script.async = true;
    script.onload = () => this.scriptLoaded();

    document.body.appendChild(script);
  }, []);

  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
  } = useMoralis();

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
    <>
      <Background />
      <SideBar />
      <Accordion />
    </>
  );
}

export default App;
