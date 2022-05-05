import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import Theme from "../../Theme";
import Web3 from "web3";
import config from "../../../local-dev-config";
//import veJSON from "../../../abis/ViridianExchange.json";
import vTJSON from "../../../abis/ViridianToken.json";
import BigNumber from "bignumber.js";
//import {FetchUser} from "../../../apis/UserAPI";
import ReactLoading from "react-loading";
import {
  useCryptoPrices,
  CryptoPriceProvider
} from "react-realtime-crypto-prices";
import {CopyToClipboard} from "react-copy-to-clipboard";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletSelector from "../../WalletSelector";
import { useWeb3React } from '@web3-react/core'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import Web3Modal from "web3modal";

// const wcProvider = new WalletConnectProvider({
//   rpc: {1: "https://polygon-mumbai.g.alchemy.com/v2/XvPpXkhm8UtkGw9b8tIMcR3vr1zTZd3b"},
//   bridge: "https://bridge.walletconnect.org",
//   qrcodeModalOptions: {
//   },
// });

//let web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/XvPpXkhm8UtkGw9b8tIMcR3vr1zTZd3b") || new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/XvPpXkhm8UtkGw9b8tIMcR3vr1zTZd3b") || "HTTP://127.0.0.1:7545");

//TODO: Instead of account, pass in user with all info through to profile/user
const items = (account) => [
  {
    title: "Disconnect",
    icon: "exit",
    url: "/",
  },
];

let provider;
let selectedAccount;

const User = ({ className, connectWallet, disconnect, account, setAccount, connected, setConnected, userInfo, setUserInfo, ethBalance, setEthBalance, setPromptInstallMetamask, setVisibleModalWallets}) => {
  const [visible, setVisible] = useState(false);
  const [walletVis, setWalletVis] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(async () => {
    if(account) {
      setBalance(parseBalance());
    }

    //alert('initing')
  }, []);

  function parseBalance(balance) {
    balance = new BigNumber(balance);
    if (10000 < balance && balance < 1000000.0) {
      return (balance / 1000).toFixed(2) + "K"
    }
    else if (balance > 1000000.0) {
      return (balance / 1000000).toFixed(2) + "M"
    }
    else {
      return balance.toFixed(2);
    }
  }

  const round = (number, decimalPlaces) => {
    const factorOfTen = Math.pow(10, decimalPlaces)
    return Math.round(number * factorOfTen) / factorOfTen
  }

  const shortenAccount = () => {
    if (account) {
      return account.toString().substring(0, 6) + "..." + account.toString().substring(38);
    }
  }

  //alert(account);
  if (account) {
    //if username is empty, ask to set up
  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.user, className)}>
        <div className={styles.head} onClick={() => setVisible(!visible)}>
          {(balance === 0) ?
              [<div className={styles.avatar}>
                <Icon name="wallet" fill='white' size="32" />
              </div>,
                <div className={styles.wallet}>
                  {account.toString().substring(0, 2) + "..." + account.toString().substring(38)}
                </div>] : [<div className={styles.avatar}>
                <Icon name="wallet" fill='white' size="32" />
            </div>,
                <div>{(ethBalance === 0) && (parseBalance(balance) !== "0.00") ? <div className={styles.wallet}>
          {parseBalance(balance)} <span className={styles.currency}>USDT</span>
            </div> : <div className={styles.wallet}>
                  {/*<img style={{width: '3ex', marginTop: '-.5ex', marginLeft: '-1ex'}} src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg' alt='ETH' />*/}
                  {/*{ethBalance}*/}
                  {account.toString().substring(0, 2) + "..." + account.toString().substring(38)}
                </div>}</div>]}
        </div>
            {visible && (
                <div className={styles.body}>
                  <CopyToClipboard text={account}
                      // onCopy={() => this.setState({copied: true})}
                  >
                    <div className={styles.code}>
                      <div className={styles.number}>{shortenAccount()}</div>
                      <button className={styles.copy}>
                        <Icon name="copy" size="16"/>
                      </button>
                    </div>
                  </CopyToClipboard>
                  <div className={styles.wrap}>
                    <div className={styles.line}>
                      {/*<div className={styles.preview}>*/}
                      {/*  <img*/}
                      {/*      src="/images/content/ve_circle.png"*/}
                      {/*      alt="Ethereum"*/}
                      {/*  />*/}
                      {/*</div>*/}
                      <div className={styles.details} style={{marginLeft: '-1ex'}}>
                        <div className={styles.info}>Balance</div>
                        <div>{(ethBalance === 0) ? <div className={styles.price}>
                          {parseBalance(balance)} <span className={styles.currency}>USDT</span>
                        </div> : <div className={styles.price}>
                          <img style={{width: '2ex', marginTop: '-.4ex'}} src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg' alt='ETH' />
                          {ethBalance}
                          {/*<>{prices.eth && <div style={{color: 'grey', fontSize: '5'}}>${Math.round((prices.eth * ethBalance) * 100) / 100}</div>}</>*/}
                          {/*<span className={styles.currency}>ETH</span>*/}
                        </div>}</div>
                      </div>
                    </div>
                    {/*<button*/}
                    {/*    className={cn("button-stroke button-small", styles.button)}*/}
                    {/*>*/}
                    {/*  Manage fun on Coinbase*/}
                    {/*</button>*/}
                  </div>
                  <div className={styles.menu}>
                    {items(account).map((x, index) =>
                        x.url ? (
                            x.url.startsWith("http") ? (
                                <button
                                    onClick={async () => {await disconnect()}}
                                    className={styles.item}
                                    href={x.url}
                                    rel="noopener noreferrer"
                                    key={index}
                                >
                                  <div className={styles.icon}>
                                    <Icon name={x.icon} size="20"/>
                                  </div>
                                  <div className={styles.text}>{x.title}</div>
                                </button>
                            ) : (
                                <Link
                                    className={styles.item}
                                    onClick={() => setVisible(!visible)}
                                    key={index}
                                    to={{ pathname: x.url, state: { account: account }}}
                                >
                                  <div className={styles.icon}>
                                    <Icon name={x.icon} size="20"/>
                                  </div>
                                  <div className={styles.text}>{x.title}</div>
                                </Link>
                            )
                        ) : (
                            <div className={styles.item} key={index}>
                              <div className={styles.icon}>
                                <Icon name={x.icon} size="20"/>
                              </div>
                              <div className={styles.text}>{x.title}</div>
                              <Theme className={styles.theme}/>
                            </div>
                        )
                    )}
                  </div>
                </div>
            )}
          </div>
        </OutsideClickHandler>
    );
  }
  else {
    return (
        <OutsideClickHandler onOutsideClick={() => {setWalletVis(false)}}>
          <div className={cn(styles.user, className)}>
           <div className={styles.head} onClick={async () => await connectWallet()}>
              <div className={styles.disconnectedWallet}>
                Connect Wallet
              </div>
            </div>
          {walletVis && (
              <div className={styles.body}>
                <WalletSelector/>
              </div>
          )}
          </div>
        </OutsideClickHandler>
    );
  }
};

export default User;
