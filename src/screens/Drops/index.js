import React, { useState, useEffect } from "react";
import cn from "classnames";
import ProgressBar from "@ramonak/react-progress-bar";
import styles from "./Home.module.sass";
import {getTrackBackground, Range} from "react-range";
import {totalSupply, mint} from "../../smartContracts/Viridian1EPassMethods"
//import {useCryptoPrices} from "react-realtime-crypto-prices";
import {Breakpoint} from 'react-socks';
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import ReactLoading from "react-loading";
import Icon from "../../components/Icon";
import Countdown from "react-countdown";
import {useWeb3React} from "@web3-react/core";

const Drops = (props) => {
    const [initialLoaded, setInitialLoaded] = useState(false);
    const [values, setValues] = useState([1]);
    const [minted, setMinted] = useState(0);
    const [minting, setMinting] = useState(false);
    const [mintSucceeded, setMintSucceeded] = useState(false);
    const [mintFailed, setMintFailed] = useState(false);
    const [whitelistMintingEnabled, setWhitelistMintingEnabled] = useState(true);
    const [addressOnWhitelist, setAddressOnWhitelist] = useState(true);
    const [publicMintingEnabled, setPublicMintingEnabled] = useState(false);
    //const prices = useCryptoPrices(["eth"]);

    const STEP = 1;
    const MIN = 1;
    const MAX = 10;

    useEffect(async () => {
        setMinted(await totalSupply());
    }, []);

    document.getElementsByClassName('crossmintParagraph-2-2-3 crossmintParagraph-d3-2-2-7').innerText = 'Hide';

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <h1 style={{marginTop: '2ex', textAlign: 'center'}}>Starting Whitelist Mint...</h1>;
        } else {
            // Render a countdown
            return <h1 style={{textAlign: 'center', color: 'gray', marginTop: '2ex'}}> Whitelist mint starts in:
            <h1 style={{textAlign: 'center', color: 'white'}}>{hours}:{minutes}:{seconds}</h1></h1>;
        }
    }

    const rendererPM = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <h1 style={{marginTop: '2ex', textAlign: 'center'}}>Starting Public Mint...</h1>;
        } else {
            // Render a countdown
            return <div> <h1 style={{textAlign: 'center', color: 'gray', marginTop: '2ex'}}> Public Mint Starts in:
                <h1 style={{textAlign: 'center', color: 'white'}}>{hours}:{minutes}:{seconds}</h1></h1>
                <h2 style={{marginTop: '-2ex', marginBottom: '-3ex', color: 'white', textAlign: 'center'}}>
                    <svg height="100" width="100" style={{marginRight: '-7.75ex'}}>
                        <circle cx="5" cy="50" r="3" stroke="red" stroke-width="3" fill="red" />
                    </svg> Whitelist Unapproved
                </h2></div>;
        }
    }
    const { active, chainId, account } = useWeb3React();


    return (
    <>
        <div className={cn("section", styles.section)}>
            <div className={cn("container", styles.container)}>
                <p2 style={{color: 'grey'}}>Viridian Packs contain physically-backed NFTs</p2>
                <h3 className={cn("h3", styles.title)}>Mint Viridian Genesis Packs</h3>
                {active + " " + account}
                <Breakpoint small down>
                    <div style={{textAlign: 'center'}}>
                        <video autoPlay loop muted playsInline style={{marginTop: '0ex', maxWidth: '40ex', borderRadius: '25px'}}>
                            <source src='https://content.viridianexchange.com/videos/GenesisPackLoopCrop.mp4' type="video/mp4"/>
                        </video>
                    </div>
                </Breakpoint>
                <Breakpoint medium up>
                    <div style={{textAlign: 'center'}}>
                        <video autoPlay loop muted playsInline style={{marginTop: '-7ex', maxWidth: '40ex', borderRadius: '25px'}}>
                            <source src='https://content.viridianexchange.com/videos/GenesisPackLoopCrop.mp4' type="video/mp4"/>
                        </video>
                    </div>
                </Breakpoint>

                {!whitelistMintingEnabled && <Countdown
                    date={Date.parse('24 May 2022 00:04:00 EST')}
                    renderer={renderer}
                />}

                {whitelistMintingEnabled && !publicMintingEnabled && !addressOnWhitelist && <Countdown
                    date={Date.parse('25 May 2022 00:04:00 EST')}
                    renderer={rendererPM}
                />}

                {(publicMintingEnabled || (whitelistMintingEnabled && addressOnWhitelist)) && <div>
                    <h2 style={{marginTop: '2ex', textAlign: 'center'}}>
                        Number to Mint
                    </h2>
                    <div style={{textAlign: 'center'}} >
                    <Range
                        values={values}
                        step={STEP}
                        min={MIN}
                        max={MAX}
                        onChange={(values) => {setValues(values);}}
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
                    <h3 style={{marginBottom: '2ex', textAlign: 'center'}}>
                        <div className={styles.wallet}>
                            <img style={{width: '3ex', marginTop: '-.5ex', marginLeft: '-1ex'}} src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg' alt='ETH' />
                            {values[0] / 10}
                        </div>
                        {/*{prices.eth && <p2 style={{color: 'grey'}}>*/}
                        {/*    ${(((values[0] / 10) * prices.eth) * 100) / 100}*/}
                        {/*</p2>}*/}
                    </h3>
                    <div style={{textAlign: 'center', marginTop: '4ex'}}>
                        {/*{JSON.stringify(props)}*/}
                        {props.account ? <div> {!minting ? <button
                            className={cn(styles.link, {})}
                            onClick={async () => {setMinting(true); await mint(props.account, values[0], setMintSucceeded, setMintFailed, setMinting);}}
                        > <>
                            <img style={{width: '4ex', marginTop: '-.5ex', marginLeft: '-1.5ex', marginRight: '1ex'}}
                                 src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg'
                                 alt='ETH' /> Buy with Polygon ETH </>
                        </button> :  <button
                            className={cn(styles.link, {
                                [styles.active]: true,
                            })}
                        > <div>
                            <ReactLoading type={'spin'} color={'#bf9a36'} height={'25%'} width={'25%'} /></div> <div style={{marginLeft: '6ex', marginTop: '-2.75ex'}}>Minting...</div>
                        </button>}</div> : <button
                            className={cn(styles.link, {
                                [styles.active]: false,
                            })}
                        > <div style={{color: 'white'}}>
                            <img style={{width: '4ex', marginTop: '-.5ex', marginLeft: '-1.5ex', marginRight: '1ex'}}
                                 src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg'
                                 alt='ETH' />
                            Connect Wallet to Mint w/ Ξ</div>
                        </button>}
                        <div style={{display: 'flex', justifyContent: 'center', width: '100%', marginTop: '3ex'}}>
                            {publicMintingEnabled && <CrossmintPayButton
                                collectionTitle="Viridian Genesis Pack Testnet"
                                collectionDescription="Viridian testnet pack system"
                                collectionPhoto="https://lh3.googleusercontent.com/hEAvHhkzaJZo4oBE7cVaL7bRjVgyoHgKmuBu9Zhl6vVjM8pe3cGU9yDVU4OxHBm2FR84KcmRSsJ0UXlRqJwJyLDP6jnPvWxS_9QvYaQ=h600"
                                clientId="e2b98186-642d-430a-ab76-57cb49d80a11"
                                className="my-custom-crossmint-button"
                                mintConfig={{
                                    type: "erc-721",
                                    price: "0.1",
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
                    <h2 style={{marginTop: '-2ex', marginBottom: '-3ex', color: 'white', textAlign: 'center'}}>
                        <svg height="100" width="100" style={{marginRight: '-7.75ex'}}>
                            <circle cx="5" cy="50" r="3" stroke="green" stroke-width="3" fill="green"/>
                        </svg> Whitelist Approved
                    </h2>
                </div>}
                <div style={{marginTop: '3ex', textAlign: 'center'}}>
                    <ProgressBar barContainerClassName="barContainer"
                                 completedClassName="barCompleted"
                                 labelClassName="barLabel"
                                 completed={40} customLabel={minted + "/2000 Minted"} />
                </div>
            </div>
        </div>
    </>
  );
}

export default Drops;
