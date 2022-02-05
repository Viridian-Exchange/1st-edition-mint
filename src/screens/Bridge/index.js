import React, { useState, useEffect } from "react";
import cn from "classnames";
import ProgressBar from "@ramonak/react-progress-bar";
import styles from "./Home.module.sass";
import {getTrackBackground, Range} from "react-range";
import {getOwnedNFTs, bridge} from "../../smartContracts/Viridian1EPassMethods"
import {useCryptoPrices} from "react-realtime-crypto-prices";
import {Breakpoint} from 'react-socks';

const Bridge = (props) => {
    const [initialLoaded, setInitialLoaded] = useState(false);
    const [values, setValues] = useState([1]);
    const [minted, setMinted] = useState([]);
    const [toBridge, setToBridge] = useState([]);
    const [fetched, setFetched] = useState(false);
    const prices = useCryptoPrices(["eth"]);

    const STEP = 1;
    const MIN = 1;
    const MAX = 10;

    useEffect(async () => {
        console.log(props.account)
        setMinted(await getOwnedNFTs(props.account));
        setToBridge(await getOwnedNFTs(props.account));
        if (!fetched) {
            setFetched(true)
        }
    }, [fetched]);

    function removeItemFromArray(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }

  return (
    <>
        <div className={cn("section", styles.section)}>
            <div className={cn("container", styles.container)}>
                {/*<p2 style={{color: 'grey'}}>Recieve a card-backed nft from the 1st edition Pokemon booster box break, along with platform perks!</p2>*/}
                <h3 className={cn("h3", styles.title)}>Bridge Viridian 1st Edition Pass to Polygon</h3>
                {/*<Breakpoint small down>*/}
                {/*    <div style={{textAlign: 'center'}}>*/}
                {/*        <video autoPlay loop muted playsInline style={{marginTop: '0ex', maxWidth: '40ex', borderRadius: '25px'}}>*/}
                {/*            <source src='https://d4xub33rt3s5u.cloudfront.net/passVidGoodLoop.mp4' type="video/mp4"/>*/}
                {/*        </video>*/}
                {/*    </div>*/}
                {/*</Breakpoint>*/}
                {/*<Breakpoint medium up>*/}
                {/*    <div style={{textAlign: 'center'}}>*/}
                {/*        <video autoPlay loop muted playsInline style={{marginTop: '-4ex', maxWidth: '90ex', borderRadius: '25px'}}>*/}
                {/*            <source src='https://d4xub33rt3s5u.cloudfront.net/passVidGoodLoop.mp4' type="video/mp4"/>*/}
                {/*        </video>*/}
                {/*    </div>*/}
                {/*</Breakpoint>*/}
                <h2 style={{marginBottom: '7ex', marginTop: '-3ex', textAlign: 'left', color: 'grey'}}>
                    Bridging all NFTs below
                </h2>
                {/*{toBridge}*/}
                <div className={styles.list}>
                    {minted.map((x, index) => (
                        <div style={{marginRight: '5ex', textAlign: 'center'}}>
                            {/*<input type="checkbox"*/}
                            {/*       checked={toBridge.includes(x)}*/}
                            {/*       onChange={() => {*/}
                            {/*            if (toBridge.includes(x)) {*/}
                            {/*                setToBridge(removeItemFromArray([...toBridge], x));*/}
                            {/*            }*/}
                            {/*            else {*/}
                            {/*                setToBridge([...toBridge].concat(x));*/}
                            {/*            }*/}
                            {/*        }}/>*/}
                            <div>
                                <img style={{maxWidth: '20ex'}} src='https://d4xub33rt3s5u.cloudfront.net/Viridian+1E+Pass+Preview.png'/>
                            </div>
                            <h4>
                                Viridian 1st Ed. Pass #{x}
                            </h4>
                        </div>))}
                </div>

                <div style={{textAlign: 'center', marginTop: '4ex'}}>
                    {/*{JSON.stringify(props)}*/}
                    <button
                        className={cn(styles.link, {
                            [styles.active]: true,
                        })}
                        onClick={async () => {await bridge(props.account, toBridge)}}
                    >
                        Bridge 🌉
                    </button>
                </div>
            </div>
        </div>
    </>
  );
}

export default Bridge;
