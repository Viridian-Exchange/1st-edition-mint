import React, {useEffect} from "react";
import cn from "classnames";
import styles from "./SignupPrompt.module.sass";
import { useWeb3React } from '@web3-react/core'
import { Injected, WalletConnect, CoinbaseWallet } from "../../utils/connectors";
import {switchNetwork} from "../../utils/walletHandlers";
import Web3Modal from "web3modal";
import Web3 from "web3";

//TODO: PASS IN USERINFO AND UPDATE THIS WHEN PUSHED TO DYNAMO
// SET FETCHED PROP SO WHEN THAT CHANGES, FETCHES THE USER AND SETS IT TO USERINFO
const WalletSelector = ({ className }) => {

  // return (
  //   <div className={cn(className, styles.transfer)} style={{textAlign: 'center', marginTop: '-2ex'}}>
  //     <div className={cn("h4", styles.info)}>Wallet Providers</div>
  //       <div className={styles.btns}>
  //           <a className={cn("button-stroke", styles.button)} onClick={() => { activate(Injected).then(() => {
  //               localStorage.setItem('connection', 'mm');
  //               alert(account);
  //               localStorage.setItem('lastAddConn', account);
  //
  //           }); }}>
  //               <img src='/images/content/metamask-fox.svg' style={{maxWidth: '5ex', marginRight: '2ex', marginLeft: '-4ex'}}/>Metamask</a>
  //           <a className={cn("button-stroke", styles.button)} onClick={() => {activate(WalletConnect).then(() => {
  //               localStorage.setItem('connection', 'wc');
  //               localStorage.setItem('lastAddConn', account);
  //           }) }}>
  //               <img src='https://d1nxzqpcg2bym0.cloudfront.net/google_play/com.connectwallet.protocol/a7569c36-9df9-11eb-b409-2380f9a26ccc/128x128'
  //                    style={{maxWidth: '5ex', marginRight: '2ex'}}/>WalletConnect</a>
  //           <a className={cn("button-stroke", styles.button)} onClick={() => { activate(CoinbaseWallet).then(() => {
  //               localStorage.setItem('connection', 'cb');
  //               localStorage.setItem('lastAddConn', account);
  //           }) }}>
  //               <img src='/cb-wallet.svg'
  //                    style={{maxWidth: '5ex', marginRight: '2ex', marginLeft: '-5.5ex'}}/>Coinbase</a>
  //       </div>
  //       <div style={{marginTop: '1ex'}}>
  //     <a className={styles.text} target="_blank" rel="noopener noreferrer" href='https://www.youtube.com/watch?v=YVgfHZMFFFQ&t=37s'>
  //       What is a crypto wallet?
  //     </a>
  //       </div>
  //   </div>
  // );
};

export default WalletSelector;
