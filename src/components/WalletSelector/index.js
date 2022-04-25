import React from "react";
import cn from "classnames";
import styles from "./SignupPrompt.module.sass";

//TODO: PASS IN USERINFO AND UPDATE THIS WHEN PUSHED TO DYNAMO
// SET FETCHED PROP SO WHEN THAT CHANGES, FETCHES THE USER AND SETS IT TO USERINFO
const WalletSelector = ({ className, account, setPromptSetup, setUserInfo}) => {
    // async function HandleAddressLink() {
    //      await HandleAddUserSimple(setUserInfo, account);
    // }

  return (
    <div className={cn(className, styles.transfer)} style={{textAlign: 'center', marginTop: '-2ex'}}>
      <div className={cn("h4", styles.info)}>Wallet Providers</div>
        <div className={styles.btns}>
            {/*<Link className={cn("button", styles.button)} onClick={async () => {*/}
            {/*    await HandleAddUserSimple(setUserInfo, account, setPromptSetup).then(() => {*/}
            {/*        setPromptSetup(false);});*/}
            {/*}} to="/profile">Go to Profile</Link>*/}
            <a className={cn("button-stroke", styles.button)} target="_blank" rel="noopener noreferrer" href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'>
                <img src='/images/content/metamask-fox.svg' style={{maxWidth: '5ex', marginRight: '2ex', marginLeft: '-4ex'}}/>Metamask</a>
            <a className={cn("button-stroke", styles.button)} target="_blank" rel="noopener noreferrer" href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'>
                <img src='https://d1nxzqpcg2bym0.cloudfront.net/google_play/com.connectwallet.protocol/a7569c36-9df9-11eb-b409-2380f9a26ccc/128x128'
                     style={{maxWidth: '5ex', marginRight: '2ex'}}/>WalletConnect </a>
        </div>
        <div style={{marginTop: '1ex'}}>
      <a className={styles.text} target="_blank" rel="noopener noreferrer" href='https://www.youtube.com/watch?v=YVgfHZMFFFQ&t=37s'>
        What is a crypto wallet?
      </a>
        </div>
    </div>
  );
};

export default WalletSelector;
