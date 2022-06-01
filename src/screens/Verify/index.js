import React, { useState, useEffect } from "react";
import cn from "classnames";
import ProgressBar from "@ramonak/react-progress-bar";
import styles from "./Home.module.sass";
import {getTrackBackground, Range} from "react-range";
import {totalSupply, mint} from "../../smartContracts/ViridianGenPassMethods"
import {useCryptoPrices} from "react-realtime-crypto-prices";
import {Breakpoint} from 'react-socks';
import {Carousel} from '3d-react-carousal';

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

    const STEP = 1;
    const MIN = 1;
    const MAX = 10;

    useEffect(async () => {
        setMinted(await totalSupply());
    }, []);

    // let slides = [
    //     <img style={{width: '3ex', marginTop: '-.5ex', marginLeft: '-1ex'}} src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg' alt='ETH' />,
    //     <img style={{width: '3ex', marginTop: '-.5ex', marginLeft: '-1ex'}} src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg' alt='ETH' />,
    //     <img style={{width: '3ex', marginTop: '-.5ex', marginLeft: '-1ex'}} src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg' alt='ETH' />,
    //     <img style={{width: '3ex', marginTop: '-.5ex', marginLeft: '-1ex'}} src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg' alt='ETH' />,
    //     <img style={{width: '3ex', marginTop: '-.5ex', marginLeft: '-1ex'}} src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg' alt='ETH' />
    // ]

    const callback = function(index){
        console.log("callback",index);
    }

  return (
    <>
        <div className={cn("section", styles.section)}>
            <div className={cn("container", styles.container)}>
                <p2 style={{color: 'grey'}}>Verify that the metadata matches the assets backing your Viridian NFTs</p2>
                <h3 className={cn("h3", styles.title)}>Verify Integrity of Viridian NFTs</h3>
                <Breakpoint small down>
                    <div style={{textAlign: 'center'}}>
                        <Carousel slides={slides} onSlideChange={callback}/>
                    </div>
                </Breakpoint>
                <Breakpoint medium up>
                    <div style={{textAlign: 'center',minHeight: '65ex'}}>
                        <Carousel slides={slides} onSlideChange={callback}/>
                    </div>
                </Breakpoint>
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
                <div style={{textAlign: 'center', marginTop: '4ex'}}>
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
                </div>
            </div>
        </div>
    </>
  );
}

export default Drops;
