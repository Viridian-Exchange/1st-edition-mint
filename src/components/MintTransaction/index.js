import React, {useEffect, useState} from "react";
import cn from "classnames";
import styles from "./MintTransaction.module.sass";
import { useWeb3React } from '@web3-react/core'
import { Injected, WalletConnect, CoinbaseWallet } from "../../utils/connectors";
import {switchNetwork} from "../../utils/walletHandlers";
import Web3Modal from "web3modal";
import Web3 from "web3";
import Icon from "../Icon";
import {Breakpoint} from 'react-socks';
import {allowance, approve, approveRegular} from "../../smartContracts/ViridianTokenMethods";
import {mint} from "../../smartContracts/ViridianGenPassMethods";
import config from "../../local-dev-config";
import vGPackJSON from "../../abis/ViridianGenesisPack.json";

let web3WS = new Web3(new Web3.providers.WebsocketProvider( "wss://eth-rinkeby.alchemyapi.io/v2/LAxJKtplSWDfvNU0-v7K77WOeCWYb4Js"));

//TODO: PASS IN USERINFO AND UPDATE THIS WHEN PUSHED TO DYNAMO
// SET FETCHED PROP SO WHEN THAT CHANGES, FETCHES THE USER AND SETS IT TO USERINFO
const MintTransaction = ({ className, mintSucceeded, numPacks, account, setMintSucceeded, setMinting }) => {
    const [approved, setApproved] = useState(false);
    const [approveHash, setApproveHash] = useState('...');
    const [mintHash, setMintHash] = useState('...');

    const shortenAddress = (address) => {
        if (address) {
            return address.toString().substring(0, 6) + "..." + address.toString().substring(38);
        }
    }

    useEffect(async () => {
        try {
            const vpContractAddress = config.rinkeby_contract_addresses.vgp_contract;

            let allowance = await allowance(account, vpContractAddress);

            let vpABI = new web3WS.eth.Contract(vGPackJSON['abi'], vpContractAddress);

            if (allowance === 0) {
                //await approve(account, vpContractAddress);
                await approveRegular(account, vpContractAddress);

                await vpABI.events.Approve({filter: {to: account}}).on('data', async function (event) {
                    if (event) {
                        setApproved(true);
                        await mint();

                        setApproveHash(event.transactionHash);
                    }
                });
            }
            else {
                setApproved(true);
                await mint();
            }

            await vpABI.events.Mint({filter: {to: account}}).on('data', async function (event) {
                if (event) {
                    setMintSucceeded(true)
                    setMinting(false);
                    setMintHash(event.transactionHash);
                }
            });
        }
        catch (e) {
            //TODO: Put this back when ready
            //setMinting(false);
        }
    }, []);

  return (
    <div className={cn(className, styles.transfer)} style={{textAlign: 'center', marginTop: '-2ex'}}>
      <h1>Minting {numPacks} Viridian Genesis Pack{numPacks > 1 && 's'}</h1>
        <h4 style={{color: 'lightgray', float: 'left', marginLeft: '1.5ex'}}>Status</h4><h4 style={{color: 'lightgray', float: 'right', marginRight: '1.5ex'}}>Transaction hash</h4>
        <Breakpoint medium up>
            <div className={styles.btns} style={{textAlign: 'center'}}>
                <h2 className={styles.pending}>
                    {!approved ?
                        <div className={styles.info}><img src="/circle.svg" style={{maxWidth: '3ex'}}/> Approve Polygon ETH
                        </div> : <div className={styles.info}><img src="/circle_check.svg" style={{maxWidth: '3ex'}}/> Approve Polygon ETH
                        </div>
                    }
                    <p2 className={styles.hash}>{shortenAddress(approveHash)}</p2>
                </h2>
                <h2 className={styles.pending}>
                    {!mintSucceeded ? <div className={styles.info} style={{marginLeft: '-8ex'}}><img src="/circle.svg" style={{maxWidth: '3ex'}}/> Mint</div> :
                        <div className={styles.info} style={{marginLeft: '-8ex'}}><img src="/circle_check.svg" style={{maxWidth: '3ex'}}/> Mint</div>}
                    <p2 className={styles.hash}>{shortenAddress(mintHash)}</p2>
                </h2>
            </div>
        </Breakpoint>
        <Breakpoint small down>
            <div className={styles.btns} style={{textAlign: 'center'}}>
                <h2 className={styles.pending}>
                    {!approved ?
                        <div className={styles.info}><img src="/circle.svg" style={{maxWidth: '3ex'}}/> Approve ETH
                        </div> : <div className={styles.info}><img src="/circle_check.svg" style={{maxWidth: '3ex'}}/> Approve ETH
                        </div>
                    }
                    <p2 className={styles.hash}>{shortenAddress(approveHash)}</p2>
                </h2>
                <h2 className={styles.pending}>
                    {!mintSucceeded ? <div className={styles.info} style={{marginLeft: '-4.3ex'}}><img src="/circle.svg" style={{maxWidth: '3ex'}}/> Mint</div> :
                        <div className={styles.info} style={{marginLeft: '-4.3ex'}}><img src="/circle_check.svg" style={{maxWidth: '3ex'}}/> Mint</div>}
                    <p2 className={styles.hash}>{shortenAddress(mintHash)}</p2>
                </h2>
            </div>
        </Breakpoint>
        {approved && mintSucceeded && <button className={styles.link}>Close</button>}
    </div>
  );
};

export default MintTransaction;
