import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { clearAllBodyScrollLocks } from "body-scroll-lock";
import styles from "./Page.module.sass";
import Header from "../Header";
import Footer from "../Footer";
import Web3 from "web3";
import Modal from "../Modal";
import WalletSelector from "../WalletSelector";
import {useWeb3React} from "@web3-react/core";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";

const CoinbaseWallet = new WalletLinkConnector({
    url: `https://eth-rinkeby.alchemyapi.io/v2/LAxJKtplSWDfvNU0-v7K77WOeCWYb4Js`,
    appName: "Viridian Genesis Drop",
    supportedChainIds: [1, 3, 4, 5, 42],
});

const WalletConnect = new WalletConnectConnector({
    rpcUrl: `https://eth-rinkeby.alchemyapi.io/v2/LAxJKtplSWDfvNU0-v7K77WOeCWYb4Js`,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
});

const Injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42]
});


const Page = ({ethBalance, setEthBalance, children}) => {
    const [networkName, setNetworkName] = useState("peen");
    const [visibleModalWrongNetwork, setVisibleModalWrongNetwork] = useState(false);
    const [visibleModalWallets, setVisibleModalWallets] = useState(false);

  let web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/XvPpXkhm8UtkGw9b8tIMcR3vr1zTZd3b") || "HTTP://127.0.0.1:7545");

    const { activate, account } = useWeb3React();

  useEffect(async () => {
    clearAllBodyScrollLocks();
    setNetworkName(await web3.eth.net.getNetworkType());
  }, [account]);

    useEffect(async () => {

        alert(JSON.stringify(localStorage.getItem('lastAddConn')));
        if (localStorage.getItem('lastAddConn') !== account) {
            localStorage.setItem('connection', '')
        }

        if(localStorage.getItem('connection') === 'mm') {
            activate(Injected);
        }
        else if(localStorage.getItem('connection') === 'wc') {
            activate(WalletConnect);
        }
        else if(localStorage.getItem('connection') === 'cb') {
            activate(CoinbaseWallet);
        }
    }, []);

      return (
          <div className={styles.page}>
              {(networkName !== 'ropsten' && networkName !== '') && <Modal
                  visible={visibleModalWrongNetwork}
                  onClose={() => {
                      setVisibleModalWrongNetwork(false);
                  }}
              >
              </Modal>}

              <Modal
                  visible={visibleModalWallets}
                  onClose={() => setVisibleModalWallets(false)}
              >
                  <WalletSelector />
              </Modal>
              <Header ethBalance={ethBalance} setEthBalance={setEthBalance} account={account} />
              <div className={styles.inner}>{children}</div>
              <Footer/>
          </div>
      );
};

export default Page;
