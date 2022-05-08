import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
//import axios from "axios";
import "./styles/app.sass";
import Page from "./components/Page";
import Faq from "./screens/Faq";
import Mint from "./screens/Mint";
import Open from "./screens/Open";
import Verify from "./screens/Verify";
import Web3 from "web3";
import { Web3Provider } from "@ethersproject/providers";
import { Breakpoint, BreakpointProvider } from 'react-socks';
import { useWeb3React } from '@web3-react/core'
import {Biconomy} from "@biconomy/mexa";
import {WalletLinkConnector} from "@web3-react/walletlink-connector";
import {WalletConnectConnector} from "@web3-react/walletconnect-connector";
import {InjectedConnector} from "@web3-react/injected-connector";
import {NetworkConnector} from "@web3-react/network-connector";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import {toHex, truncateAddress} from "./utils/utils";
import { ethers } from "ethers";

const providerOptions = {
    coinbasewallet: {
        package: CoinbaseWalletSDK, // Required
        options: {
            appName: "Viridian Exchange", // Required
            rpc: "https://polygon-mumbai.g.alchemy.com/v2/XvPpXkhm8UtkGw9b8tIMcR3vr1zTZd3b", // Optional if `infuraId` is provided; otherwise it's required
            chainId: 4, // Optional. It defaults to 1 if not provided
            darkMode: true // Optional. Use dark theme, defaults to false
        }
    },
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
            rpc: "https://polygon-mumbai.g.alchemy.com/v2/XvPpXkhm8UtkGw9b8tIMcR3vr1zTZd3b"
        }
    },
};

const networkParams = {
    "0x0100": {
        chainId: "0x0100",
        rpcUrls: ["https://api.harmony.one"],
        chainName: "Polygon Mainnet",
        nativeCurrency: { name: "Ether", decimals: 18, symbol: "ETH" },
        blockExplorerUrls: ["https://explorer.harmony.one"],
        iconUrls: ["https://harmonynews.one/wp-content/uploads/2019/11/slfdjs.png"]
    },
};

const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions, // required,
    theme: "dark"
});

const biconomy = new Biconomy(Web3.givenProvider || new Web3.providers.HttpProvider( "https://eth-rinkeby.alchemyapi.io/v2/LAxJKtplSWDfvNU0-v7K77WOeCWYb4Js"),{apiKey: "TVCsgQVfk.a6031565-1cb6-40da-8a60-2ffec22e3bed", debug: true});

let biconomyWeb3 = new Web3(biconomy);

//TODO: show address, list of followers, description, etc on profile page
// function in the smart contract to add a user that is followed
// (triggered by follow button press-> calls the function which takes in an address and adds the user to the list of following)
// front end will pull the followee user and be able to show the profile on the initial user
// , and call in the CLI, once followers working, you will see another profile show up
// use item flow -> Profile/user flow
// get current user wallet, then abi->getuserfromaddress->return json of user struct
function App() {
    const [biconomyFetched, setBiconomyFetched] = useState(false);
    const [account, setAccount] = useState();
    const [provider, setProvider] = useState();
    const [library, setLibrary] = useState();
    const [signature, setSignature] = useState("");
    const [error, setError] = useState("");
    const [chainId, setChainId] = useState();
    const [network, setNetwork] = useState();
    const [message, setMessage] = useState("");
    const [signedMessage, setSignedMessage] = useState("");
    const [verified, setVerified] = useState();
    const [gaslessReady, setGaslessReady] = useState(false);

    const connectWallet = async () => {
        //try {
            const provider = await web3Modal.connect();
            const library = new Web3(provider);
            //alert(JSON.stringify(library.givenProvider));
            const accounts = await library.eth.getAccounts();
            //alert(JSON.stringify(accounts));
            const network = await library.eth.net.getId();
            //alert(JSON.stringify(network));
            setProvider(provider);
            setLibrary(library);
            if (accounts) setAccount(accounts[0]);
            setChainId(network);

            biconomy.onEvent(biconomy.READY, () => {
                // Initialize your dapp here like getting user accounts etc
                console.log("Setting gasless ready");
                setGaslessReady(true);
            }).onEvent(biconomy.ERROR, (error, message) => {
                // Handle error while initializing mexa
                console.error(error);
            });
        // } catch (error) {
        //     alert(JSON.stringify(error));
        // }
    };

    const handleNetwork = (e) => {
        const id = e.target.value;
        setNetwork(Number(id));
    };

    const handleInput = (e) => {
        const msg = e.target.value;
        setMessage(msg);
    };

    const switchNetwork = async () => {
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: toHex(4) }]
            });
        } catch (switchError) {
            //alert(JSON.stringify(switchError.code))
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainName: 'Polygon Mainnet',
                                chainId: toHex(137),
                                nativeCurrency: {
                                    name: 'Polygon',
                                    symbol: 'MATIC',
                                    decimals: 18
                                },
                                rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
                                blockExplorerUrls: ['https://polygonscan.com/']
                            }]
                            });
                } catch (error) {
                    setError(error);
                }
            }
        }
    };

    const refreshState = () => {
        setAccount();
        setChainId();
        setNetwork("");
        setMessage("");
        setSignature("");
        setVerified(undefined);
    };

    const disconnect = async () => {
        await web3Modal.clearCachedProvider();
        refreshState();
    };

    useEffect(async () => {
        if (web3Modal.cachedProvider) {
            await connectWallet();
        }
    }, []);

    useEffect(async () => {
        //alert(chainId);
        if (toHex(chainId) !== toHex(4)) {
            await switchNetwork();
        }
    }, [chainId])

    useEffect(() => {
        if (provider?.on) {
            const handleAccountsChanged = (accounts) => {
                console.log("accountsChanged", accounts);
                if (accounts) setAccount(accounts[0]);
            };

            const handleChainChanged = (_hexChainId) => {
                setChainId(_hexChainId);
            };

            const handleDisconnect = () => {
                console.log("disconnect", error);
                disconnect();
            };

            provider.on("accountsChanged", handleAccountsChanged);
            provider.on("chainChanged", handleChainChanged);
            provider.on("disconnect", handleDisconnect);

            return () => {
                if (provider.removeListener) {
                    provider.removeListener("accountsChanged", handleAccountsChanged);
                    provider.removeListener("chainChanged", handleChainChanged);
                    provider.removeListener("disconnect", handleDisconnect);
                }
            };
        }
    }, [provider]);

  return (
        <BreakpointProvider>
            <Router forceRefresh={true}>
              <Switch>
                <Route
                    exact
                    path="/"
                >
                  <Redirect to="/genesis-drop" />
                </Route>
                <Route
                    exact
                    path="/genesis-drop"
                    render={() => (
                        <Page biconomyFetched={biconomyFetched} account={account} setAccount={setAccount} connectWallet = {connectWallet} disconnect={disconnect}>
                          <Mint biconomyFetched={biconomyFetched} account={account} setAccount={setAccount} gaslessReady={gaslessReady} />
                        </Page>
                    )}
                />
                <Route
                    exact
                    path="/open"
                    render={() => (
                        <Page biconomyFetched={biconomyFetched} account={account} setAccount={setAccount} connectWallet = {connectWallet} disconnect={disconnect}>
                          <Open biconomyFetched={biconomyFetched} account={account} setAccount={setAccount} />
                        </Page>
                    )}
                />
                <Route
                    exact
                    path="/verify"
                    render={() => (
                        <Page>
                          <Verify  />
                        </Page>
                    )}
                />
                <Route
                    exact
                    path="/faq"
                    render={() => (
                        <Page>
                          <Faq />
                        </Page>
                    )}
                />
                <Route path="*">
                  <Redirect to="/genesis-drop" />
                </Route>
              </Switch>
            </Router>
        </BreakpointProvider>
  );
}

export default App;
