import React, { useState, useEffect } from "react";
import cn from "classnames";
import ProgressBar from "@ramonak/react-progress-bar";
import styles from "./Home.module.sass";
import {getTrackBackground, Range} from "react-range";
import {totalSupply, mint, getOwnedNFTs, openPack, tokenURI} from "../../smartContracts/ViridianGenPassMethods"
//import {useCryptoPrices} from "react-realtime-crypto-prices";
import {Breakpoint} from 'react-socks';
import {Carousel} from '3d-react-carousal';
import ReactLoading from "react-loading";
import { BlurTransition } from "react-transitions-library";

const Open = (props) => {
    const [initialLoaded, setInitialLoaded] = useState(false);
    const [values, setValues] = useState([1]);
    const [minted, setMinted] = useState(0);
    //const prices = useCryptoPrices(["eth"]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loadingOpening, setLoadingOpening] = useState(false);
    const [showOpeningAnimation, setShowOpeningAnimation] = useState(false);
    const [showOpenedCard, setShowOpenedCard] = useState(false);
    const [startFade, setStartFade] = useState(false);
    const [slides, setSlides] = useState([]);
    const [tokenIds, setTokenIds] = useState([]);
    const [packNums, setPackNums] = useState([]);
    const [showCardVideo, setShowCardVideo] = useState(false);
    const [curVideo, setCurVideo] = useState('https://content.viridianexchange.com/videos/PackOpenAnimation.mp4')
    const [fetched, setFetched] = useState(false);

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

                let pID = [];
                let tID = [];

                nfts.map(async (x, index) => {
                    slidesTemp.push(<video autoPlay muted loop={true} playsInline style={{maxWidth: '40ex'}}>
                        <source src='https://content.viridianexchange.com/videos/GenesisPackLoopCrop.mp4'
                                type="video/mp4"/>
                    </video>);
                    let uri = await tokenURI(x, props.account);
                    pID.push(uri.split('/')[4]);
                    tID.push(x);
                });

                setSlides(slidesTemp);
                slidesTemp = [];
                setPackNums(pID);
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

    const runOpeningAnimation = async () => {
        setShowOpeningAnimation(true); await setTimeout(function() { setStartFade(true); setCurVideo('http://content.viridianexchange.com/videos/transition-short-crop.mp4') }, 9100); await setTimeout(function() { setCurVideo('https://content.viridianexchange.com/videos/PikachuLoop.mp4');
        }, 10000);
        await setTimeout(function() {
            setStartFade(false); }, 10250);
    }

    const callback = function(index){
        console.log("callback",index);
        if (packNums.length <= 3) {
            setCurrentIndex(index % packNums.length);
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
                {showOpeningAnimation && <BlurTransition
                    in={startFade}
                    timeout={250}
                    from={"0px"}
                    to={"25px"}
                    style={{textAlign: 'center', minWidth: '100ex', borderRadius: '35px'}}
                >
                    <div style={{textAlign: 'center', minWidth: '100ex', borderRadius: '35px'}}>
                        <video autoPlay muted playsInline key={curVideo} loop={true} style={{maxWidth: '100ex', borderRadius: '35px'}}>
                            <source src={curVideo}
                                    type="video/mp4"/>
                        </video></div>
                </BlurTransition>}

                {slides.length > 0 && !showOpeningAnimation && <Breakpoint small down>
                    <div style={{textAlign: 'center'}}>
                        <Carousel slides={slides} onSlideChange={callback}/>
                    </div>
                </Breakpoint> }
                {slides.length > 0 && !showOpeningAnimation && <Breakpoint medium up>
                    <div style={{textAlign: 'center', minHeight: '65ex'}}>
                        <Carousel slides={slides} onSlideChange={callback} arrows={true}/>
                    </div>
                </Breakpoint>}

                {slides.length === 0 &&
                    <div style={{textAlign: 'center', marginTop: '3ex'}}>
                        <h2 style={{textAlign: 'center', color: 'gray', marginBottom: '2ex'}}>
                            Purchase a Viridian Genesis Pack on secondary to open
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
                {slides.length > 0 && <div style={{textAlign: 'center', marginTop: '4ex'}}>
                    {/*{JSON.stringify(props)}*/}
                    {loadingOpening && !showOpeningAnimation && <button
                        className={cn(styles.link, {
                        })}
                        style={{color: 'black'}}
                    >
                        <ReactLoading type={'spin'} color={'#bf9a36'} height={'25%'} width={'25%'} /> <div style={{marginLeft: '6ex', marginTop: '-2.75ex', marginBottom: '1ex'}}>Opening...</div>
                    </button>}

                    {!loadingOpening && <button
                        className={cn(styles.link, {
                        })}
                        onClick={async () => {setLoadingOpening(true); await openPack(props.account, tokenIds[currentIndex], setLoadingOpening, "", setMinted).then(() =>
                        {runOpeningAnimation();}) }}
                    >
                        <img style={{width: '4ex', marginTop: '-.5ex', height: '6ex', marginRight: '1ex'}}
                             src='/trading_card_icon.svg'
                             alt='ETH' /> {"Open Pack " + idParse(packNums[currentIndex])}
                    </button>}
                </div>}
            </div>
        </div>
    </>
  );
}

export default Open;
