import React, { useState, useEffect } from "react";
import cn from "classnames";
import ProgressBar from "@ramonak/react-progress-bar";
import styles from "./Home.module.sass";
import {getTrackBackground, Range} from "react-range";
import {
    totalSupply,
    mint,
    isWhitelistMintingEnabled,
    isPublicMintingEnabled, isAddressWhitelisted
} from "../../smartContracts/ViridianGenPassMethods";
import {Breakpoint} from 'react-socks';
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import ReactLoading from "react-loading";
import Icon from "../../components/Icon";
import Countdown from "react-countdown";
import { useWeb3React } from '@web3-react/core';
import { switchNetwork } from "../../utils/walletHandlers";
import WalletSelector from "../../components/WalletSelector";
import Modal from "../../components/Modal";
import MintTransaction from "../../components/MintTransaction";
import vGPJSON from "../../abis/ViridianGenesisPack.json";
import Web3 from "web3";
import config from "../../local-dev-config";

const Mint = (props) => {
    const [values, setValues] = useState([1]);
    const [minted, setMinted] = useState(0);
    const [minting, setMinting] = useState(false);
    const [mintSucceeded, setMintSucceeded] = useState(false);
    const [mintFailed, setMintFailed] = useState(false);
    const [whitelistMintingEnabled, setWhitelistMintingEnabled] = useState(false);
    const [addressOnWhitelist, setAddressOnWhitelist] = useState(false);
    const [publicMintingEnabled, setPublicMintingEnabled] = useState(false);

    const STEP = 1;
    const MIN = 1;
    const MAX = 10;

    useEffect(async () => {
        if (props.account) {
            setAddressOnWhitelist(await isAddressWhitelisted(props.account));
        }
        setMinted(await totalSupply(props.library));
        setWhitelistMintingEnabled(await isWhitelistMintingEnabled(props.library));
        //setWhitelistMintingEnabled(true);
        setPublicMintingEnabled(await isPublicMintingEnabled(props.library));
        //setPublicMintingEnabled(true);
    }, [props.account]);

    document.getElementsByClassName('crossmintParagraph-2-2-3 crossmintParagraph-d3-2-2-7').innerText = 'Hide';

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <h1 style={{marginTop: '2ex', textAlign: 'center'}}>Loading Genesis Mint...</h1>
        } else {
            // Render a countdown
            return <div><h1 style={{textAlign: 'center', color: 'gray', marginTop: '2ex'}}> Whitelist mint starts in:
            <h1 style={{textAlign: 'center', color: 'white'}}>{hours}:{minutes}:{seconds}</h1></h1>
                {!addressOnWhitelist && <h2 style={{marginTop: '-2ex', marginBottom: '-3ex', color: 'white', textAlign: 'center'}}>
                    <svg height="100" width="100" style={{marginRight: '-7.75ex'}}>
                        <circle cx="5" cy="50" r="3" stroke="red" stroke-width="3" fill="red" />
                    </svg> Whitelist Unapproved
                </h2>}
            </div>
        }
    }

    const rendererPM = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <h1 style={{marginTop: '2ex', textAlign: 'center'}}>Starting Public Mint...</h1>
        } else {
            // Render a countdown
            return <div> <h1 style={{textAlign: 'center', color: 'gray', marginTop: '2ex'}}> Public Mint Starts in:
                <h1 style={{textAlign: 'center', color: 'white'}}>{hours}:{minutes}:{seconds}</h1></h1>
                <h2 style={{marginTop: '-2ex', marginBottom: '-3ex', color: 'white', textAlign: 'center'}}>
                    <svg height="100" width="100" style={{marginRight: '-7.75ex'}}>
                        <circle cx="5" cy="50" r="3" stroke="red" stroke-width="3" fill="red" />
                    </svg> Whitelist Unapproved
                </h2></div>
        }
    }


    return (
    <>
        <div className={cn("section", styles.section)}>
            <div className={cn("container", styles.container)}>
                <p2 style={{color: 'grey'}}>Purchase Viridian Genesis Packs containing physically-backed NFTs</p2>
                <h3 className={cn("h3", styles.title)}>Mint Viridian Genesis Packs</h3>
                {/*{publicMintingEnabled + "|" + whitelistMintingEnabled}*/}
                <Breakpoint small down>
                    <div style={{textAlign: 'center'}}>
                        <video autoPlay loop muted playsInline style={{marginTop: '0ex', maxWidth: '22ex', borderRadius: '25px'}}>
                            <source src='https://content.viridianexchange.com/videos/GenesisPackLoopCrop.mp4' type="video/mp4"/>
                        </video>
                    </div>
                </Breakpoint>
                <Breakpoint medium up>
                    <div style={{textAlign: 'center'}}>
                        <video autoPlay loop muted playsInline style={{marginTop: '-8ex', maxWidth: '30ex', borderRadius: '25px'}}>
                            <source src='https://content.viridianexchange.com/videos/GenesisPackLoopCrop.mp4' type="video/mp4"/>
                        </video>
                    </div>
                </Breakpoint>

                {!whitelistMintingEnabled && !publicMintingEnabled && <Countdown
                    date={Date.parse('24 May 2022 00:04:00 EST')}
                    renderer={renderer}
                />}

                {whitelistMintingEnabled && !publicMintingEnabled && !addressOnWhitelist && <Countdown
                    date={Date.parse('25 May 2022 00:04:00 EST')}
                    renderer={rendererPM}
                />}

                {(publicMintingEnabled || (whitelistMintingEnabled && addressOnWhitelist)) && <div>
                    <h2 style={{marginTop: '2ex', textAlign: 'center'}}>
                        Mint Amount
                    </h2>
                    <div style={{textAlign: 'center'}} >
                    <Range
                        values={values}
                        step={STEP}
                        min={MIN}
                        max={MAX}
                        onChange={(values) => {
                            if (whitelistMintingEnabled && addressOnWhitelist) {
                                if (values[0] <= 2) {
                                    setValues(values);
                                }
                            }
                            else if (publicMintingEnabled) {
                                setValues(values);
                            }
                        }}
                        renderTrack={({ props, children }) => (
                            <div
                                onMouseDown={props.onMouseDown}
                                onTouchStart={props.onTouchStart}
                                style={{
                                    ...props.style,
                                    height: "36px",
                                    display: "flex",
                                    alignSelf: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <div
                                    ref={props.ref}
                                    style={{
                                        height: "8px",
                                        width: "50%",
                                        borderRadius: "4px",
                                        background: getTrackBackground({
                                            values,
                                            colors: ["#3772FF", "#E6E8EC"],
                                            min: MIN,
                                            max: MAX,
                                        }),
                                        alignSelf: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {children}
                                </div>
                            </div>
                        )}
                        renderThumb={({ props, isDragged }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: "24px",
                                    width: "24px",
                                    borderRadius: "50%",
                                    backgroundColor: "#3772FF",
                                    border: "4px solid #FCFCFD",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "-33px",
                                        color: "#fff",
                                        fontWeight: "600",
                                        fontSize: "14px",
                                        lineHeight: "18px",
                                        fontFamily: "Poppins",
                                        padding: "4px 4px",
                                        borderRadius: "8px",
                                        backgroundColor: "#141416",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    {values[0]}
                                </div>
                            </div>
                        )}
                    />
                    </div>
                    <Modal
                        visible={minting}
                        onClose={() => setMinting(false)}
                    >
                        <MintTransaction mintSucceeded={mintSucceeded} setMintFailed={setMintFailed} numPacks={values[0]} setMintSucceeded={setMintSucceeded} account={props.account} setMinting={setMinting} />
                    </Modal>
                    <h3 style={{marginBottom: '2ex', textAlign: 'center'}}>
                        <div className={styles.wallet}>
                            <img style={{width: '3ex', marginTop: '-.5ex', marginLeft: '-1ex'}} src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg' alt='ETH' />
                            {values[0] / 5}
                        </div>
                    </h3>
                    <div style={{textAlign: 'center', marginTop: '4ex'}}>
                        {props.account ? <div> {!minting ? <> {props.gaslessReady ? <button
                            className={cn(styles.link, {})}
                            onClick={async () => {
                                const web3WS = new Web3(new Web3.providers.WebsocketProvider( "wss://eth-rinkeby.alchemyapi.io/v2/LAxJKtplSWDfvNU0-v7K77WOeCWYb4Js"));

                                let vNFTABIWS = new web3WS.eth.Contract(vGPJSON['abi'], config.rinkeby_contract_addresses.vgp_contract);

                                // await vNFTABIWS.events.Mint({filter: {from: props.account}}).on('data', async function (event) {
                                //     alert('FFmntd' + JSON.stringify(event))
                                //     setMintSucceeded(true);
                                //     setMintFailed(false);
                                //     setMinting(false);
                                //     setMinted(minted + values[0]);
                                // }).on('err', (e) => {console.error(e); setMintFailed(true); setMinting(false);});
                                //
                                // await vNFTABIWS.events.Transfer({filter: {from: props.account}}).on('data', async function (event) {
                                //     alert('FFtrsfr' + JSON.stringify(event))
                                //     setMintSucceeded(true);
                                //     setMintFailed(false);
                                //     setMinting(false);
                                //     setMinted(minted + values[0]);
                                // }).on('err', (e) => {console.error(e); setMintFailed(true); setMinting(false);});
                                //
                                // await vNFTABIWS.events.Mint({filter: {to: props.account}}).on('data', async function (event) {
                                //     alert('mntd' + JSON.stringify(event))
                                //     setMintSucceeded(true);
                                //     setMintFailed(false);
                                //     setMinting(false);
                                //     setMinted(minted + values[0]);
                                // }).on('err', (e) => {console.error(e); setMintFailed(true); setMinting(false);});

                                // await vNFTABIWS.events.Transfer({filter: {to: props.account}}).on('data', async function (event) {
                                //     //alert('trsfr' + JSON.stringify(event))
                                //     setMintSucceeded(true);
                                //     setMintFailed(false);
                                //     setMinting(false);
                                //     setMinted(parseInt(minted) + parseInt(values[0]));
                                //
                                //     setTimeout(() => {
                                //         setMintSucceeded(false);
                                //     }, "10000");
                                // }).on('err', (e) => {console.error(e); setMintFailed(true); setMinting(false);
                                //     setTimeout(() => {
                                //         setMintFailed(false);
                                //     }, "5000");});

                                setMinting(true); //await mint(props.account, values[0], setMintSucceeded, setMintFailed, setMinting, props.library);


                            }}
                        > <>
                            <img style={{width: '2.5ex', marginTop: '-.5ex', marginLeft: '-1.5ex', marginRight: '1ex'}}
                                 src='https://openseauserdata.com/files/265128aa51521c90f7905e5a43dcb456_new.svg'
                                 alt='ETH' /> Buy {values[0]} Pack{values[0] > 1 && 's'} with Polygon ETH </>
                        </button> : <button
                            className={cn(styles.link, {
                                [styles.active]: true,
                            })}
                        > <div>
                            <ReactLoading type={'spin'} color={'#bf9a36'} height={'16%'} width={'16%'} /></div>
                                <div style={{marginLeft: '6ex', marginTop: '-2.75ex'}}>Loading Gasless...</div>
                        </button>}</> : <button
                            className={cn(styles.link, {
                                [styles.active]: true,
                            })}
                        > <div>
                            <ReactLoading type={'spin'} color={'#bf9a36'} height={'25%'} width={'25%'} /></div>
                                <div style={{marginLeft: '6ex', marginTop: '-2.75ex'}}>Minting...</div>
                        </button>}</div> : <button
                            className={cn(styles.link, {
                                [styles.active]: false,
                            })}
                            onClick={() => {props.connectWallet()}}
                        > <div style={{color: 'white'}}>
                            <img style={{width: '4ex', marginTop: '-.5ex', marginLeft: '-1.5ex', marginRight: '1ex'}}
                                 src='https://openseauserdata.com/files/265128aa51521c90f7905e5a43dcb456_new.svg'
                                 alt='ETH' />
                            Connect Wallet to Mint w/ Ξ</div>
                        </button>}
                        <div style={{display: 'flex', justifyContent: 'center', width: '100%', marginTop: '3ex'}}>
                            {publicMintingEnabled && <CrossmintPayButton
                                collectionTitle="Viridian Genesis Pack Testnet"
                                collectionDescription="Viridian testnet pack system"
                                collectionPhoto="https://lh3.googleusercontent.com/hEAvHhkzaJZo4oBE7cVaL7bRjVgyoHgKmuBu9Zhl6vVjM8pe3cGU9yDVU4OxHBm2FR84KcmRSsJ0UXlRqJwJyLDP6jnPvWxS_9QvYaQ=h600"
                                clientId="1ed33aeb-27ad-497d-9c5f-2877d230cacc"
                                className="my-custom-crossmint-button"
                                mintConfig={{
                                    type: "erc-721",
                                    price: "600",
                                    _numMint: values[0],
                                    _to: props.account
                                }}
                            />}
                            {publicMintingEnabled && <CrossmintPayButton
                                collectionTitle="Viridian Genesis Pack Testnet"
                                collectionDescription="Viridian testnet pack system"
                                collectionPhoto="https://lh3.googleusercontent.com/hEAvHhkzaJZo4oBE7cVaL7bRjVgyoHgKmuBu9Zhl6vVjM8pe3cGU9yDVU4OxHBm2FR84KcmRSsJ0UXlRqJwJyLDP6jnPvWxS_9QvYaQ=h600"
                                clientId="1ed33aeb-27ad-497d-9c5f-2877d230cacc"
                                paymentMethod="ETH"
                                className="my-custom-crossmint-button"
                                mintConfig={{
                                    type: "erc-721",
                                    price: "600",
                                    _numMint: values[0],
                                    _to: props.account
                                }}
                            />}
                        </div>
                        {mintSucceeded && <div style={{marginTop: '3ex', color: 'green'}}>
                            <Icon name="check" size="20" fill={"#BF9A36"} style={{marginRight: "3ex"}}/> Mint Successful
                        </div>}
                        {mintFailed && <div style={{marginTop: '3ex', color: 'red'}}>
                            <Icon name="close" size="20" fill={"#FF0000"} style={{marginRight: "3ex"}}/> Mint Failed, Try Again.
                        </div>}
                </div>
                </div>}
                {(!publicMintingEnabled && addressOnWhitelist) && <h2 style={{marginTop: '-3ex', marginBottom: '-3ex', color: 'white', textAlign: 'center'}}>
                    <svg height="100" width="100" style={{marginRight: '-7.75ex'}}>
                        <circle cx="5" cy="50" r="3" stroke="green" stroke-width="3" fill="green"/>
                    </svg> Whitelist Approved
                </h2>}
                {(whitelistMintingEnabled || publicMintingEnabled) && <div style={{marginTop: '1ex', textAlign: 'center'}}>
                    <ProgressBar barContainerClassName="barContainer"
                                 completedClassName="barCompleted"
                                 labelClassName="barLabel"
                                 completed={40} customLabel={minted + "/2000 Minted"} />
                </div>}

                {props.gaslessReady + ""}
            </div>
        </div>
    </>
  );
}

export default Mint;
