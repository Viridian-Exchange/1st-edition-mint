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
import {approve, approveRegular, tokenAllowance} from "../../smartContracts/ViridianTokenMethods";
import {mint} from "../../smartContracts/ViridianGenPassMethods";
import config from "../../local-dev-config";
import vGPackJSON from "../../abis/ViridianGenesisPack.json";
import vTPackJSON from "../../abis/MetaTransactionTokenABI.json";

let web3WS = new Web3(new Web3.providers.WebsocketProvider( "wss://eth-rinkeby.alchemyapi.io/v2/LAxJKtplSWDfvNU0-v7K77WOeCWYb4Js"));

//TODO: PASS IN USERINFO AND UPDATE THIS WHEN PUSHED TO DYNAMO
// SET FETCHED PROP SO WHEN THAT CHANGES, FETCHES THE USER AND SETS IT TO USERINFO
const MintTransaction = ({ className, mintSucceeded, numPacks, account, setMintSucceeded, setMintFailed, setMinting, library }) => {
    const [approving, setApproving] = useState(false);
    const [approved, setApproved] = useState(false);
    const [mintLoading, setMintLoading] = useState(false);
    const [approveHash, setApproveHash] = useState('...');
    const [mintHash, setMintHash] = useState('...');

    const shortenAddress = (address) => {
        if (address) {
            return address.toString().substring(0, 6) + "..." + address.toString().substring(34, 38);
        }
    }

    useEffect(async () => {
        //alert(await tokenAllowance(account, config.rinkeby_contract_addresses.vgp_contract))

        try {
            const vpContractAddress = config.rinkeby_contract_addresses.vgp_contract;
            const vtContractAddress = config.rinkeby_contract_addresses.vt_contract;

            let allowance = await tokenAllowance(account, vpContractAddress);

            let vpABI = new web3WS.eth.Contract(vGPackJSON['abi'], vpContractAddress);
            let vtABI = new web3WS.eth.Contract(vTPackJSON, vtContractAddress);

            await vpABI.events.Transfer({filter: {to: account}}).on('data', async function (event) {
                if (event) {
                    setMintLoading(false);
                    setMintSucceeded(true)
                    //setMinting(false);
                    setMintHash(event.transactionHash);
                }
            });

            //alert(parseInt(allowance) === 0)
            if (parseInt(allowance) === 0) {
                //await approve(account, vpContractAddress);
                setApproving(true);

                await vtABI.events.Approval({filter: {to: account}}).on('data', async function (event) {
                    if (event) {
                        setApproving(false);
                        setApproved(true);
                        //alert('found event')
                        setMintLoading(true);
                        setApproveHash(event.transactionHash);
                        await mint(account, numPacks, setMintSucceeded, setMintFailed, setMinting, library);
                    }
                });

                await approveRegular(account, vpContractAddress);
            }
            else {
                //alert('already approved')
                setApproved(true);
                setMintLoading(true);
                await mint(account, numPacks, setMintSucceeded, setMintFailed, setMinting, library);
            }
        }
        catch (e) {
            //TODO: Put this back when ready
            console.error(e);
            setMintLoading(false);
            setMinting(false);
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
                        <div className={styles.info}> {!approving ? <img src="/circle.svg" style={{maxWidth: '3ex'}}/> : <svg className={styles.spinner}>
                            <circle className={styles.path} cx="25" cy="25" r="15" fill="none" stroke-width="5"></circle>
                        </svg>}
                            <div style={{marginLeft: '4ex', marginTop: '0.25ex'}}>Approve Polygon ETH</div>
                        </div> : <div className={styles.info} style={{marginLeft: '0ex'}}>
                            {!approving ? <img src="/circle_check.svg" style={{maxWidth: '3ex', marginRight: '0.5ex'}}/> : <svg className={styles.spinner}>
                                <circle className={styles.path} cx="25" cy="25" r="15" fill="none" stroke-width="5"></circle>
                            </svg> }
                            Approve Polygon ETH
                        </div>
                    }
                    <a className={styles.hash} href={"https://rinkeby.etherscan.io/tx/" + approveHash} target="_blank" rel="noopener noreferrer">{shortenAddress(approveHash)}</a>
                </h2>
                <h2 className={styles.pending}>
                    {!mintSucceeded ? <div className={styles.info} style={{marginLeft: '-10ex'}}>
                        {!mintLoading ?  <img src="/circle.svg" style={{maxWidth: '3ex'}}/> : <svg className={styles.spinner} style={{marginTop: '4ex', marginRight: '4ex'}}>
                            <circle className={styles.path} cx="25" cy="25" r="15" fill="none" stroke-width="5"></circle>
                        </svg>}
                        {!mintLoading ? <div style={{marginLeft: '8ex', marginTop: '-2.5ex'}}>Mint</div> : <div style={{marginLeft: '8ex', marginTop: '0.5ex'}}>Mint</div>}</div> :
                        <div className={styles.info}>
                            {!mintLoading ? <img src="/circle_check.svg" style={{maxWidth: '3ex'}}/> : <svg className={styles.spinner}>
                                <circle className={styles.path} r="20" fill="none" stroke-width="5"></circle>
                            </svg>}
                            Mint</div>}
                    <a className={styles.hash} href={"https://rinkeby.etherscan.io/tx/" + mintHash} target="_blank" rel="noopener noreferrer">{shortenAddress(mintHash)}</a>
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
                    <a className={styles.hash} href={"https://rinkeby.etherscan.io/tx/" + approveHash} target="_blank" rel="noopener noreferrer">{shortenAddress(approveHash)}</a>
                </h2>
                <h2 className={styles.pending}>
                    {!mintSucceeded ? <div className={styles.info} style={{marginLeft: '-4.3ex'}}>
                        {!mintLoading ? <img src="/circle.svg" style={{maxWidth: '3ex'}}/> : <img src="/circle.svg" style={{maxWidth: '3ex'}}/>}
                            Mint</div> :
                        <div className={styles.info} style={{marginLeft: '-4.3ex'}}>
                            {!mintLoading ? <img src="/circle_check.svg" style={{maxWidth: '3ex'}}/> : <img src="/circle_check.svg" style={{maxWidth: '3ex'}}/> }
                                Mint</div>}
                    <a className={styles.hash} href={"https://rinkeby.etherscan.io/tx/" + mintHash} target="_blank" rel="noopener noreferrer">{shortenAddress(mintHash)}</a>
                </h2>
            </div>
        </Breakpoint>
        {approved && mintSucceeded && <button className={styles.link} onClick={() => setMinting(false)}>Close</button>}
    </div>
  );
};

export default MintTransaction;
