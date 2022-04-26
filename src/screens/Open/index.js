import React, { useState, useEffect } from "react";
import cn from "classnames";
import ProgressBar from "@ramonak/react-progress-bar";
import styles from "./Home.module.sass";
import {getTrackBackground, Range} from "react-range";
import {totalSupply, mint, getOwnedNFTs, openPack, tokenURI} from "../../smartContracts/Viridian1EPassMethods"
//import {useCryptoPrices} from "react-realtime-crypto-prices";
import {Breakpoint} from 'react-socks';
import {Carousel} from '3d-react-carousal';

// let slidez = [
//     <video autoPlay muted loop={true} playsInline style={{maxWidth: '40ex'}}>
//         <source src='https://viridian-images.s3.us-east-2.amazonaws.com/ezgif.com-gif-maker.mp4' type="video/mp4"/>
//     </video>,
//     <video autoPlay muted loop={true} playsInline style={{maxWidth: '40ex'}}>
//         <source src='https://viridian-images.s3.us-east-2.amazonaws.com/ezgif.com-gif-maker.mp4' type="video/mp4"/>
//     </video>,
//     <video autoPlay muted loop={true} playsInline style={{maxWidth: '40ex'}}>
//         <source src='https://viridian-images.s3.us-east-2.amazonaws.com/ezgif.com-gif-maker.mp4' type="video/mp4"/>
//     </video>,
//     <video autoPlay muted loop={true} playsInline style={{maxWidth: '40ex'}}>
//         <source src='https://viridian-images.s3.us-east-2.amazonaws.com/ezgif.com-gif-maker.mp4' type="video/mp4"/>
//     </video>,
//     <video autoPlay muted loop={true} playsInline style={{maxWidth: '40ex'}}>
//         <source src='https://viridian-images.s3.us-east-2.amazonaws.com/ezgif.com-gif-maker.mp4' type="video/mp4"/>
//     </video>,
//     <video autoPlay muted loop={true} playsInline style={{maxWidth: '40ex'}}>
//         <source src='https://viridian-images.s3.us-east-2.amazonaws.com/ezgif.com-gif-maker.mp4' type="video/mp4"/>
//     </video>];

const Open = (props) => {
    const [initialLoaded, setInitialLoaded] = useState(false);
    const [values, setValues] = useState([1]);
    const [minted, setMinted] = useState(0);
    //const prices = useCryptoPrices(["eth"]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loadingOpening, setLoadingOpening] = useState(false);
    const [showOpeningAnimation, setShowOpeningAnimation] = useState(false);
    const [showOpenedCard, setShowOpenedCard] = useState(false);
    const [slides, setSlides] = useState([]);
    const [tokenIds, setTokenIds] = useState([]);

    const [fetched, setFetched] = useState(false)

    const STEP = 1;
    const MIN = 1;
    const MAX = 10;

    useEffect(async () => {
        //alert(JSON.stringify(props));
        if (props.account) {
            //alert(await getOwnedNFTs(props.account));
            if (!fetched) {
                //alert('hi');
               // alert('hi1');
                //alert(await getOwnedNFTs(props.account));
                //alert('hi3');
                //setMinted(await totalSupply());


                let nfts = await getOwnedNFTs(props.account);

                //alert("NFTS: " /+ JSON.stringify(nfts));

                let slidesTemp = [];

                let tID = [];

                nfts.map(async (x, index) => {
                    slidesTemp.push(<video autoPlay muted loop={true} playsInline style={{maxWidth: '40ex'}}>
                        <source src='https://viridian-images.s3.us-east-2.amazonaws.com/ezgif.com-gif-maker.mp4'
                                type="video/mp4"/>
                    </video>);
                    let uri = await tokenURI(x, props.account);
                    tID.push(uri.split('/')[4]);
                });

                setSlides(slidesTemp);
                slidesTemp = [];
                setTokenIds(tID);
                setFetched(true);
            }
        }
        else {
            setFetched(false);
        }
    }, [fetched, props]);

    // let slides = [
    //     <img style={{width: '3ex', marginTop: '-.5ex', marginLeft: '-1ex'}} src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg' alt='ETH' />,
    //     <img style={{width: '3ex', marginTop: '-.5ex', marginLeft: '-1ex'}} src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg' alt='ETH' />,
    //     <img style={{width: '3ex', marginTop: '-.5ex', marginLeft: '-1ex'}} src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg' alt='ETH' />,
    //     <img style={{width: '3ex', marginTop: '-.5ex', marginLeft: '-1ex'}} src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg' alt='ETH' />,
    //     <img style={{width: '3ex', marginTop: '-.5ex', marginLeft: '-1ex'}} src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg' alt='ETH' />
    // ]

    const callback = function(index){
        console.log("callback",index);
        if (tokenIds.length <= 3) {
            setCurrentIndex(index % tokenIds.length);
        }
        else {
            setCurrentIndex(index);
        }
    }

    const idParse = (id) => {
        if (id) {
            return "#" + id;
        }
        else {
            return "";
        }
    }

  return (
    <>
        <div className={cn("section", styles.section)}>
            <div className={cn("container", styles.container)}>
                <p2 style={{color: 'grey'}}>Reveal the physically-backed NFT inside!</p2>
                <h3 className={cn("h3", styles.title)}>Open Viridian Genesis Packs</h3>
                {/*{JSON.stringify(tokenIds)}*/}
                {/*{JSON.stringify(slides.length)}*/}
                {slides.length > 0 && <Breakpoint small down>
                    <div style={{textAlign: 'center'}}>
                        <Carousel slides={slides} onSlideChange={callback}/>
                    </div>
                </Breakpoint> }
                {slides.length > 0 && <Breakpoint medium up>
                    <div style={{textAlign: 'center', minHeight: '65ex'}}>
                        <Carousel slides={slides} onSlideChange={callback} arrows={true}/>
                    </div>
                </Breakpoint>}

                {slides.length === 0 &&
                    <div style={{textAlign: 'center', marginTop: '3ex'}}>
                        <h2 style={{textAlign: 'center', color: 'gray', marginBottom: '2ex'}}>
                            Purchase a Viridian Genesis Pass on secondary to open
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
                {/*<h2 style={{marginTop: '2ex', textAlign: 'center'}}>*/}
                {/*    Open 🃏*/}
                {/*</h2>*/}
                {/*<h3 style={{marginBottom: '2ex', textAlign: 'center'}}>*/}
                {/*    <div className={styles.wallet}>*/}
                {/*        <img style={{width: '3ex', marginTop: '-.5ex', marginLeft: '-1ex'}} src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg' alt='ETH' />*/}
                {/*        {values[0]}*/}
                {/*    </div>*/}
                {/*    {prices.eth && <p2 style={{color: 'grey'}}>*/}
                {/*        ${((values[0] * prices.eth) * 100) / 100}*/}
                {/*    </p2>}*/}
                {/*</h3>*/}
                {slides.length > 0 && <div style={{textAlign: 'center', marginTop: '4ex'}}>
                    {/*{JSON.stringify(props)}*/}
                    <button
                        className={cn(styles.link, {
                        })}
                        onClick={async () => {await openPack(props.account, values[0])}}
                    >
                        <img style={{width: '4ex', marginTop: '-.5ex', height: '6ex', marginRight: '1ex'}}
                             src='/trading_card_icon.svg'
                             alt='ETH' /> {"Open Pack " + idParse(tokenIds[currentIndex])}
                    </button>
                </div>}
            </div>
        </div>
    </>
  );
}

export default Open;
