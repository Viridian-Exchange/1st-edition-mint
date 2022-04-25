import React, { useState, useEffect } from "react";
import cn from "classnames";
import ProgressBar from "@ramonak/react-progress-bar";
import styles from "./Home.module.sass";
import {getTrackBackground, Range} from "react-range";
import {totalSupply, mint} from "../../smartContracts/Viridian1EPassMethods"
//import {useCryptoPrices} from "react-realtime-crypto-prices";
import {Breakpoint} from 'react-socks';
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";

const Drops = (props) => {
    const [initialLoaded, setInitialLoaded] = useState(false);
    const [values, setValues] = useState([1]);
    const [minted, setMinted] = useState(0);
    //const prices = useCryptoPrices(["eth"]);

    const STEP = 1;
    const MIN = 1;
    const MAX = 10;

    useEffect(async () => {
        setMinted(await totalSupply());
    }, []);

    document.getElementsByClassName('crossmintParagraph-2-2-3 crossmintParagraph-d3-2-2-7').innerText = 'Hide';

  return (
    <>
        <div className={cn("section", styles.section)}>
            <div className={cn("container", styles.container)}>
                <p2 style={{color: 'grey'}}>Viridian Packs contain physically backed NFTs</p2>
                <h3 className={cn("h3", styles.title)}>Mint Viridian Genesis Packs</h3>
                <Breakpoint small down>
                    <div style={{textAlign: 'center'}}>
                        <video autoPlay loop muted playsInline style={{marginTop: '0ex', maxWidth: '40ex', borderRadius: '25px'}}>
                            <source src='https://viridian-images.s3.us-east-2.amazonaws.com/Main_0001-0075.mp4' type="video/mp4"/>
                        </video>
                    </div>
                </Breakpoint>
                <Breakpoint medium up>
                    <div style={{textAlign: 'center'}}>
                        <video autoPlay loop muted playsInline style={{marginTop: '-7ex', maxWidth: '43ex', borderRadius: '25px'}}>
                            <source src='https://viridian-images.s3.us-east-2.amazonaws.com/Main_0001-0075.mp4' type="video/mp4"/>
                        </video>
                    </div>
                </Breakpoint>
                <h2 style={{marginTop: '2ex', textAlign: 'center'}}>
                    Number to Mint
                </h2>
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
                                width: "66.5%",
                                alignSelf: "right",
                                justifyContent: "right",
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
                    <button
                        className={cn(styles.link, {
                            [styles.active]: true,
                        })}
                        onClick={async () => {await mint(props.account, values[0])}}
                    > <>
                        <img style={{width: '4ex', marginTop: '-.5ex', marginLeft: '-1.5ex', marginRight: '1ex'}} src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg' alt='ETH' /> Buy with Polygon ETH </>
                    </button>
                    <CrossmintPayButton
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
                    />
                <div style={{textAlign: 'center', marginTop: '3ex'}}>
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
