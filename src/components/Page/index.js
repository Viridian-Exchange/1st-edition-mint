import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { clearAllBodyScrollLocks } from "body-scroll-lock";
import styles from "./Page.module.sass";
import Header from "../Header";
import Footer from "../Footer";
// import {tokenURI, ownerOfNoReq} from "../../smartContracts/ViridianNFTMethods";
// import {tokenPackURI, ownerOfPackNoReq} from "../../smartContracts/ViridianPackMethods";
// import ReactLoading from 'react-loading';
// import Image from "../Image";
import Web3 from "web3";
import Modal from "../Modal";
import WalletSelector from "../WalletSelector";

const Page = ({ setPromptInstallMetamask, users, ownedNFTs, ownedPacks, nfts, filteredNfts, setFilteredNFTs, children, account, setAccount, connected, setConnected, userInfo, setUserInfo, ethBalance, setEthBalance, vextBalance, setVextBalance }) => {
    const [initialLoaded, setInitialLoaded] = useState(false);
    const [networkName, setNetworkName] = useState("peen");
    const [visibleModalWrongNetwork, setVisibleModalWrongNetwork] = useState(false);
    const [visibleModalWallets, setVisibleModalWallets] = useState(false);

  let web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/XvPpXkhm8UtkGw9b8tIMcR3vr1zTZd3b") || "HTTP://127.0.0.1:7545");
    // console.log(networkName === "ropsten");
    // if(networkName === "ropsten") {

  useEffect(async () => {
    //window.scrollTo(0, 0);
    clearAllBodyScrollLocks();

    setNetworkName(await web3.eth.net.getNetworkType());
  }, [account]);

  //if (initialLoaded) {
      return (
          <div className={styles.page}>
              {(networkName !== 'ropsten' && networkName !== '') && <Modal
                  visible={visibleModalWrongNetwork}
                  onClose={() => {
                      setVisibleModalWrongNetwork(false);
                      //history.push("/");
                  }}
              >
              </Modal>}

              <Modal
                  visible={visibleModalWallets}
                  onClose={() => setVisibleModalWallets(false)}
              >
                  <WalletSelector />
              </Modal>

              {/*{account}*/}
              {/*{JSON.stringify(location.state)}*/}
              {/*{JSON.stringify(nfts)}*/}
              {/*{JSON.stringify(initialLoaded)}*/}
              <Header setVisibleModalWallets={setVisibleModalWallets} setPromptInstallMetamask={setPromptInstallMetamask} vextBalance={vextBalance} setVextBalance={setVextBalance} ethBalance={ethBalance} setEthBalance={setEthBalance} account={account}
                      setAccount={setAccount} connected={connected} setConnected={setConnected} />
              <div className={styles.inner}>{children}</div>
              <Footer/>
          </div>
      );
  //}
  // else {
  //     return (
  //         <div className={styles.page}>
  //             {account}
  //             {JSON.stringify(location.state)}
  //             {/*{JSON.stringify(nfts)}*/}
  //             {JSON.stringify(initialLoaded)}
  //             <Header nfts={nfts} filteredNfts={filteredNfts} setFilteredNFTs={setFilteredNFTs}
  //                     vextBalance={vextBalance} setVextBalance={setVextBalance} account={account}
  //                     setAccount={setAccount} connected={connected} setConnected={setConnected} userInfo={userInfo}
  //                     setUserInfo={setUserInfo}/>
  //             <div style={{display: 'flex',
  //                 justifyContent: 'center',
  //                 alignItems: 'center',
  //                 position: 'relative',
  //                 marginTop: '20ex', marginBottom: '20ex'}}>
  //                 <ReactLoading type={'spin'} color={'#bf9a36'} height={'10%'} width={'10%'} />
  //             </div>
  //             <div style={{display: 'flex',
  //                 justifyContent: 'center',
  //                 position: 'absolute',
  //                 alignItems: 'center',
  //                 top: '26.3%',
  //                 left: '40.656%', transform: 'scale(.36, .36)'}}>
  //                 <Image
  //                     style={{maxWidth: '1ex', maxHeight: '1ex'}}
  //                     src="/logo.svg"
  //                     srcDark="/logo.svg"
  //                     alt="Viridian Exchange"
  //                 />
  //             </div>
  //             <Footer/>
  //         </div>
  //     )
  // }
};

export default Page;
