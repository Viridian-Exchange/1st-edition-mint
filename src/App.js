import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
//import axios from "axios";
import "./styles/app.sass";
import Page from "./components/Page";
import Faq from "./screens/Faq";
import Drops from "./screens/Drops";
import Open from "./screens/Open";
import Verify from "./screens/Verify";
import Bridge from "./screens/Bridge";
import config from "./local-dev-config";
import Web3 from "web3";
import vTJSON from "./abis/ViridianToken.json";
import BigNumber from "bignumber.js";
import  { Breakpoint, BreakpointProvider } from 'react-socks';
//import {FetchAllUsers, FetchUser, HandleAddUser, HandleAddUserSimple, HandleUpdateUser} from "./apis/UserAPI";
import {
  useCryptoPrices,
  CryptoPriceProvider
} from "react-realtime-crypto-prices";
//import posthog from 'posthog-js';

//posthog.init("phc_xnVfYWTOySi1xgfxvO4GQR4HaJi2ZSI156QXjxHVdh1", {api_host: 'https://app.posthog.com'});

let web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/XvPpXkhm8UtkGw9b8tIMcR3vr1zTZd3b") || "HTTP://127.0.0.1:7545");

//TODO: show address, list of followers, description, etc on profile page
// function in the smart contract to add a user that is followed
// (triggered by follow button press-> calls the function which takes in an address and adds the user to the list of following)
// front end will pull the followee user and be able to show the profile on the initial user
// , and call in the CLI, once followers working, you will see another profile show up
// use item flow -> Profile/user flow
// get current user wallet, then abi->getuserfromaddress->return json of user struct
function App() {
  const [listings, setListings] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [ownedNfts, setOwnedNfts] = useState([]);
  const [ownedPacks, setOwnedPacks] = useState([]);
  const [fetchedAndParsed, setFetchedAndParsed] = useState(false);
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [ethBalance, setEthBalance] = useState(0);
  const [ethBalanceUSD, setEthBalanceUSD] = useState(0);
  const [vextBalance, setVextBalance] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [promptSetup, setPromptSetup] = useState(false);
  const [promptInstallMetamask, setPromptInstallMetamask] = useState(false);
  const [userFetched, setUserFetched] = useState(false);
  const [checkUserPrompt, setCheckUserPrompt] = useState(false);
  const nftsCopy = [];
  const [users, setUsers] = useState([]);
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [filteredNfts, setFilteredNFTs] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  //const [nftsSet, setNftsSet] = useState(false);
  let nftsSet = false;

  //const history = useHistory();
  //const location = useLocation();

  const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const {ethereum} = window;
    if (!Boolean(ethereum && ethereum.isMetaMask)) {
      setPromptInstallMetamask(true);
    }
  }

  //TODO: Figure out how to call this from aws to avoid the cors error
  // const fetchCurrencyData = () => {
  //   axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=10')
  //       .then(response => {
  //         const wanted = ['ethereum']
  //         const result = response.data.filter(currency =>
  //             wanted.includes(currency.id),
  //         )
  //         //alert(JSON.stringify(result));
  //       })
  //       .catch(err => console.log(err))
  // }

  async function newUserCheck(account_from_eth) {

    //let res = await FetchUser(setUserInfo, account_from_eth);
    // if (!res) {
    //   await setPromptSetup(true);
    //   //alert("New user!")
    //   return true;
    // }

    //alert(JSON.stringify(history))
    //history.replace(location.pathname, { state: "penis"});


    //     .then(async (res) => {
    //

    //
    // })


    // if (connected && (JSON.stringify(userInfo)) === "{}") {
    //     await setPromptSetup(true);
    //
    //
    // }
    return false;
  }

  async function connectWallet() {
    try {
      // Will open the MetaMask UI
      // You should disable this button while the request is pending!
      //alert('connecting wallet')
      await window.ethereum.request({ method: 'eth_requestAccounts' }).then(async (accounts) => {
        //alert(JSON.stringify(accounts));
        setAccount(accounts[0]);
        if (accounts[0]) {
          //alert(accounts[0]);
          await setConnected(true);
          //posthog.identify(account);
          if (account && connected) {
            await newUserCheck(accounts[0]);
          }

          // if (!(await newUserCheck())) {
          //     await FetchUser(setUserInfo, accounts[0]);
          // }

        }
        // else {
        //    // alert("Prompt Metamask");
        //     setPromptInstallMetamask(true);
        // }
        //alert(JSON.stringify(account));
      });

      //TODO: Figure out a way to cleanly prompt adding these assets
      // const wasAdded = await ethereum.request({
      //     method: 'wallet_watchAsset',
      //     params: {
      //         type: 'ERC20', // Initially only supports ERC20, but eventually more!
      //         options: {
      //             address: tokenAddress, // The address that the token is at.
      //             symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
      //             decimals: tokenDecimals, // The number of decimals in the token
      //             image: tokenImage, // A string url of the token logo
      //         },
      //     },
      // });

      // Check if MetaMask is installed
      // MetaMask injects the global API into window.ethereum
      if (window.ethereum) {
        try {
          // check if the chain to connect to is installed
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x4' }], // chainId must be in hexadecimal numbers
          });
        } catch (error) {
          // This error code indicates that the chain has not been added to MetaMask
          // if it is not, then install it into the user MetaMask
          if (error.code === 4902) {
            //alert('hi')
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainName: 'Rinkeby Test Network',
                    chainId: '0x4'
                  },
                ],
              });
            } catch (addError) {
              console.log("ADD ERROR:")
              console.error(addError);
            }
          }
          console.error(error);
        }
      } else {
        // if no window.ethereum then MetaMask is not installed
        alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
      }


      //alert(JSON.stringify(web3));
      await setConnected(true);
      // await web3.eth.getBalance(account).then(async (balance) =>
      //     await setEthBalance(round(balance * .000000000000000001, 4)));
      await web3.eth.getBalance(account, function(err, result) {
        if (err) {
          //console.log(err)
        } else {
          //alert(web3.utils.fromWei(result, "ether"))
          //alert('fetchingData');
          //fetchCurrencyData();
          setEthBalance(round(web3.utils.fromWei(result, "ether"), 4));
        }
      })

      //alert("Getting vext balancealert(\"1\")")
      await setVextBalance(await getVEXTBalance());


      // await setUserInfo(await getUserInfo());





      //alert(account);
      //await web3.eth.sign(web3.utils.sha3("test"), account, function (err, result) { //console.log(err, result); });
    } catch (error) {
      //alert("cannot connect")
      //console.error(error);
    }
  }


  async function getVEXTBalance() {
    //alert("2")
    const vtContractAddress = config.mumbai_contract_addresses.vt_contract;
    ////console.log(JSON.stringify(vNFTJSON));
    let vtABI = new web3.eth.Contract(vTJSON['abi'], vtContractAddress);
    return await vtABI.methods.balanceOf(account).call();
  }

  function parseVextBalance(vextBalance) {
    //alert("BEF: " + vextBalance);
    vextBalance = new BigNumber(vextBalance);
    vextBalance = vextBalance.shiftedBy(-18);
    vextBalance = vextBalance.toNumber();
    //alert(vextBalance);
    //alert(vextBalance < 1000000.0);
    if (10000 < vextBalance && vextBalance < 1000000.0) {
      return (vextBalance / 1000).toFixed(2) + "K"
    }
    else if (vextBalance > 1000000.0) {
      //alert("DIV: " + vextBalance / 1000000)
      return (vextBalance / 1000000).toFixed(2) + "M"
    }
    else {
      return vextBalance.toFixed(2);
    }
  }

  const round = (number, decimalPlaces) => {
    const factorOfTen = Math.pow(10, decimalPlaces)
    return Math.round(number * factorOfTen) / factorOfTen
  }


  useEffect(async () => {


    if (!checkUserPrompt) {

      //alert(JSON.stringify(Web3.givenProvider));
      if (Web3.givenProvider) {
        //alert("Connecting wallet")
        await connectWallet();

        //await alert(connected);
        //connect().then(() => setConnected(true));
      }
    }

    isMetaMaskInstalled();





  }, [connected]);



  return (
      <CryptoPriceProvider>
        <BreakpointProvider>
            <Router forceRefresh={true}>
              {/*<AnimatedPopup success={success} setSuccess={setSuccess} error={error} setError={setError}/>*/}
              {/*{JSON.stringify(fetchedAndParsed)}*/}
              <Switch>
                <Route
                    exact
                    path="/"
                >
                  <Redirect to="/mint" />
                </Route>
                <Route
                    exact
                    path="/mint"
                    render={() => (
                        <Page setPromptInstallMetamask = {setPromptInstallMetamask} ethBalance={ethBalance} setEthBalance={setEthBalance} vextBalance={vextBalance} setVextBalance={setVextBalance} account = {account} setAccount = {setAccount} connected = {connected} setConnected = {setConnected} userInfo = {userInfo} setUserInfo = {setUserInfo}>
                          <Drops account={account} />
                        </Page>
                    )}
                />
                <Route
                    exact
                    path="/open"
                    render={() => (
                        <Page setPromptInstallMetamask = {setPromptInstallMetamask} ethBalance={ethBalance} setEthBalance={setEthBalance} vextBalance={vextBalance} setVextBalance={setVextBalance} account = {account} setAccount = {setAccount} connected = {connected} setConnected = {setConnected} userInfo = {userInfo} setUserInfo = {setUserInfo}>
                          <Open account={account} />
                        </Page>
                    )}
                />
                <Route
                    exact
                    path="/verify"
                    render={() => (
                        <Page setPromptInstallMetamask = {setPromptInstallMetamask} ethBalance={ethBalance} setEthBalance={setEthBalance} vextBalance={vextBalance} setVextBalance={setVextBalance} account = {account} setAccount = {setAccount} connected = {connected} setConnected = {setConnected} userInfo = {userInfo} setUserInfo = {setUserInfo}>
                          <Verify account={account} />
                        </Page>
                    )}
                />
                <Route
                    exact
                    path="/faq"
                    render={() => (
                        <Page setPromptInstallMetamask = {setPromptInstallMetamask} ethBalance={ethBalance} setEthBalance={setEthBalance} vextBalance={vextBalance} setVextBalance={setVextBalance} account = {account} setAccount = {setAccount} connected = {connected} setConnected = {setConnected} userInfo = {userInfo} setUserInfo = {setUserInfo}>
                          <Faq />
                        </Page>
                    )}
                />
                <Route path="*">
                  <Redirect to="/mint" />
                </Route>
              </Switch>
            </Router>
        </BreakpointProvider>
      </CryptoPriceProvider>
  );
}

export default App;
