import React, { useState, useEffect } from "react";
import cn from "classnames";
import ProgressBar from "@ramonak/react-progress-bar";
import styles from "./Home.module.sass";
import {getTrackBackground, Range} from "react-range";
import {totalSupply, mint} from "../../smartContracts/ViridianGenPassMethods"
import {useCryptoPrices} from "react-realtime-crypto-prices";
import {Breakpoint} from 'react-socks';
import {Carousel} from '3d-react-carousal';
import Icon from "../../components/Icon";

let slides = [
    <video autoPlay muted loop={true} playsInline style={{maxWidth: '40ex'}}>
        <source src='https://viridian-images.s3.us-east-2.amazonaws.com/ezgif.com-gif-maker.mp4' type="video/mp4"/>
    </video>,
    <video autoPlay muted loop={true} playsInline style={{maxWidth: '40ex'}}>
        <source src='https://viridian-images.s3.us-east-2.amazonaws.com/ezgif.com-gif-maker.mp4' type="video/mp4"/>
    </video>,
    <video autoPlay muted loop={true} playsInline style={{maxWidth: '40ex'}}>
        <source src='https://viridian-images.s3.us-east-2.amazonaws.com/ezgif.com-gif-maker.mp4' type="video/mp4"/>
    </video>,
    <video autoPlay muted loop={true} playsInline style={{maxWidth: '40ex'}}>
        <source src='https://viridian-images.s3.us-east-2.amazonaws.com/ezgif.com-gif-maker.mp4' type="video/mp4"/>
    </video>,
    <video autoPlay muted loop={true} playsInline style={{maxWidth: '40ex'}}>
        <source src='https://viridian-images.s3.us-east-2.amazonaws.com/ezgif.com-gif-maker.mp4' type="video/mp4"/>
    </video>];

const Drops = (props) => {
    const [initialLoaded, setInitialLoaded] = useState(false);
    const [values, setValues] = useState([1]);
    const [minted, setMinted] = useState(0);
    const prices = useCryptoPrices(["eth"]);
    const [verified, setVerified] = useState(false);
    const [uris, setURIs] = useState([]);
    const [urisVerified, setURIsVerified] = useState([]);

    const STEP = 1;
    const MIN = 1;
    const MAX = 10;

    useEffect(async () => {
        setMinted(await totalSupply());
    }, []);

    let slides = [
        <img style={{width: '3ex', marginTop: '-.5ex', marginLeft: '-1ex'}} src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg' alt='ETH' />,
        <img style={{width: '3ex', marginTop: '-.5ex', marginLeft: '-1ex'}} src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg' alt='ETH' />,
        <img style={{width: '3ex', marginTop: '-.5ex', marginLeft: '-1ex'}} src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg' alt='ETH' />,
        <img style={{width: '3ex', marginTop: '-.5ex', marginLeft: '-1ex'}} src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg' alt='ETH' />,
        <img style={{width: '3ex', marginTop: '-.5ex', marginLeft: '-1ex'}} src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg' alt='ETH' />
    ]

    let uriz = [
        'https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg',
        'https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg',
        'https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg',
        'https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg',
        'https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg',
        'https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg',
        'https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg',
    ]
    let urizVerified = [
        true,
        true,
        true,
        false,
        true,
        true,
        false,
    ]

    const callback = function(index){
        console.log("callback",index);
    }

  return (
    <>
        <div className={cn("section", styles.section)}>
            <div className={cn("container", styles.container)}>
                <p2 style={{color: 'grey'}}>Verify that the metadata matches the assets backing your Viridian NFTs</p2>
                <h3 className={cn("h3", styles.title)}>Verify Integrity of Viridian NFTs</h3>
                {uris.length > 0 && <div className={styles.grid}>
                {
                    uriz.map((uri, index) => {
                        return <div className={styles.item}>
                            <img src={uri} ></img>
                            <div>{urizVerified[index] ? <div style={{marginTop: '3ex', color: 'green'}}>
                                <Icon name="check" size="20" fill={"#BF9A36"} style={{marginRight: "3ex"}}/> Verification Successful
                            </div> :
                                <div style={{marginTop: '3ex', color: 'red'}}>
                                    <Icon name="close" size="20" fill={"#FF0000"} style={{marginRight: "3ex"}}/> Verification Failed: Contact Viridian Exchange for Assistance
                                </div>}</div>
                        </div>
                })
                }
                </div>}

                {uris.length === 0 &&
                <div style={{textAlign: 'center', marginTop: '3ex'}}>
                    <h2 style={{textAlign: 'center', color: 'gray', marginBottom: '2ex'}}>
                        Purchase a Viridian NFT on secondary to verify
                    </h2>
                    <a
                        href="https://opensea.io"
                        target="_blank" rel="noopener noreferrer"
                        style={{marginRight: '1ex'}}
                    >
                        <button
                            className={cn(styles.link, {
                            })}
                        >
                            <img style={{maxWidth: '5ex', marginRight: '1.5ex', marginLeft: '-.5ex'}} src='https://opensea.io/static/images/logos/opensea.svg'/>
                            Opensea
                        </button>
                    </a>

                    <a
                        href="https://looksrare.org"
                        target="_blank" rel="noopener noreferrer"
                        style={{marginLeft: '1ex'}}
                    >
                        <button
                            className={cn(styles.link, {
                            })}
                        >
                            <img style={{maxWidth: '6.8ex', marginLeft: '-2ex'}} src='https://logowik.com/content/uploads/images/looksrare9736.jpg'/>
                            Looksrare
                        </button>
                    </a>
                </div>
                }
                {uris.length > 0 && <div style={{textAlign: 'center', marginTop: '4ex'}}>
                    {/*{JSON.stringify(props)}*/}
                    <button
                        className={cn(styles.link, {
                            [styles.active]: true,
                        })}
                        onClick={async () => {await mint(props.account, values[0])}}
                    >
                        <>
                            <img style={{width: '4.5ex', marginRight: '1ex'}}
                                 src='verify.svg'
                                 alt='ETH' /> Verify Integrity </>
                    </button>
                </div>}
            </div>
        </div>
    </>
  );
}

export default Drops;
