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
import { Injected, WalletConnect, CoinbaseWallet } from "../../utils/connectors";
import { switchNetwork } from "../../utils/walletHandlers";

const Page = ({biconomyFetched, children, account, setAccount, connectWallet, disconnect, chainId}) => {
    const [networkName, setNetworkName] = useState("");
    const [visibleModalWrongNetwork, setVisibleModalWrongNetwork] = useState(false);
    const [visibleModalWallets, setVisibleModalWallets] = useState(false);

    let web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/XvPpXkhm8UtkGw9b8tIMcR3vr1zTZd3b") || "HTTP://127.0.0.1:7545");

    //const { activate, account, library } = useWeb3React();

    // useEffect(async () => {
    //     alert("LBR: " + JSON.stringify(library));
    //     if (biconomyFetched === true) {
    //         alert("lib: " + JSON.stringify(library));
    //         // if (localStorage.getItem('lastAddConn') !== account) {
    //         //     localStorage.setItem('connection', '');
    //         // }
    //
    //         if (localStorage.getItem('connection') === 'mm') {
    //             activate(Injected);
    //         } else if (localStorage.getItem('connection') === 'wc') {
    //             activate(WalletConnect);
    //         } else if (localStorage.getItem('connection') === 'cb') {
    //             activate(CoinbaseWallet);
    //         }
    //     }
    // }, [biconomyFetched]);

  useEffect(async () => {
    clearAllBodyScrollLocks();
  }, []);

      return (
          <div className={styles.page}>
              <Modal
                  visible={visibleModalWallets}
                  onClose={() => setVisibleModalWallets(false)}
              >
                  <WalletSelector />
              </Modal>
              <Header account={account} setAccount={setAccount} connectWallet={connectWallet} disconnect={disconnect} />
              {}
              {chainId && <div className={styles.ntwrk}><div style={{color: 'white'}}>Current Network:</div>
                  {chainId.toString() === "0x1" ? <div style={{marginTop: '-5ex'}}><svg height="100" width="100" style={{marginRight: '-10.75ex'}}>
                          <circle cx="5" cy="50" r="3" stroke="green" stroke-width="3" fill="green" />
                      </svg>Ethereum</div> :
                      <>{chainId.toString() === "0x89" ? <div style={{marginTop: '-5ex'}}><svg height="100" width="100" style={{marginRight: '-10.75ex'}}>
                          <circle cx="5" cy="50" r="3" stroke="green" stroke-width="3" fill="green" />
                      </svg>Polygon</div> : <div style={{marginTop: '-5ex'}}><svg height="100" width="100" style={{marginRight: '-10.75ex'}}>
                          <circle cx="5" cy="50" r="3" stroke="red" stroke-width="3" fill="red" />
                      </svg>Invalid</div>}</>}</div>}
              <div className={styles.inner}>{children}</div>
              <Footer/>
          </div>
      );
};

export default Page;
