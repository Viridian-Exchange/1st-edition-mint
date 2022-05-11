/*******************************************
 * THIS IS THE EIP-712 SIGN IMPLEMENTATION *
 *******************************************/

import config from "../local-dev-config";
import vTJSON from "../abis/MetaTransactionTokenABI.json";
import Web3 from "web3";
import {Biconomy} from "@biconomy/mexa";
//let web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/XvPpXkhm8UtkGw9b8tIMcR3vr1zTZd3b") || "HTTP://127.0.0.1:7545");
let walletWeb3 = new Web3(Web3.givenProvider || Web3.providers.HttpProvider( "https://eth-rinkeby.alchemyapi.io/v2/LAxJKtplSWDfvNU0-v7K77WOeCWYb4Js"));

const biconomy = new Biconomy(Web3.givenProvider || new Web3.providers.HttpProvider( "https://eth-rinkeby.alchemyapi.io/v2/LAxJKtplSWDfvNU0-v7K77WOeCWYb4Js"),{apiKey: "TVCsgQVfk.a6031565-1cb6-40da-8a60-2ffec22e3bed", debug: true});

let biconomyWeb3 = new Web3(biconomy);

// biconomy.onEvent(biconomy.READY, () => {
//     // Initialize your dapp here like getting user accounts etc
//     //alert("initialized");
// }).onEvent(biconomy.ERROR, (error, message) => {
//     // Handle error while initializing mexa
//     //alert(error);
// });

const getSignatureParameters = signature => {
    if (!walletWeb3.utils.isHexStrict(signature)) {
        throw new Error(
            'Given value "'.concat(signature, '" is not a valid hex string.')
        );
    }
    var r = signature.slice(0, 66);
    var s = "0x".concat(signature.slice(66, 130));
    var v = "0x".concat(signature.slice(130, 132));
    v = walletWeb3.utils.hexToNumber(v);
    if (![27, 28].includes(v)) v += 27;
    return {
        r: r,
        s: s,
        v: v
    };
};

export async function approve(fromAddr, exchangeAddress) {
    const vTContractAddress = config.rinkeby_contract_addresses.vtContract;

    //let contract = new web3.eth.Contract(vTJSON, vTContractAddress);

    let infinite_approve_amount = '115792089237316195423570985008687907853269984665640564039457584007913129639935'; //(2^256 - 1 )

    //let functionSignature = contract.methods.approve(exchangeAddress, infinite_approve_amount).encodeABI();

    // This web3 instance is used to get user signature from connected wallet
    //let walletWeb3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider( "https://polygon-mumbai.g.alchemy.com/v2/XvPpXkhm8UtkGw9b8tIMcR3vr1zTZd3b"));

    // Initialize constants
    const domainType = [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "verifyingContract", type: "address" },
        { name: "salt", type: "bytes32" },
    ];
    const metaTransactionType = [
        { name: "nonce", type: "uint256" },
        { name: "from", type: "address" },
        { name: "functionSignature", type: "bytes" }
    ];
// replace the chainId 42 if network is not kovan
    // TODO: Make sure replacing verifyingContract with the WETH contract is correct
    let domainData = {
        name: "Wrapped Ether",
        version: "1",
        verifyingContract: vTContractAddress,
        // converts Number to bytes32. Use your chainId instead of 42 if network is not Kovan
        // TODO: Make sure this is correct
        salt: '0x' + (137).toString(16).padStart(64, '0')
    };


        let contract = new biconomyWeb3.eth.Contract(
            vTJSON,
            vTContractAddress);

                    let nonce = await contract.methods.getNonce(fromAddr).call();
                    // Create your target method signature.. here we are calling setQuote() method of our contract
                    let functionSignature = contract.methods.approve(exchangeAddress, infinite_approve_amount).encodeABI();
                    let message = {};
                    message.nonce = parseInt(nonce);
                    message.from = fromAddr;
                    message.functionSignature = functionSignature;

                    const dataToSign = JSON.stringify({
                    types: {
                    EIP712Domain: domainType,
                    MetaTransaction: metaTransactionType
                },
                    domain: domainData,
                    primaryType: "MetaTransaction",
                    message: message
                });

                    // NOTE: Using walletWeb3 here, as it is connected to the wallet where user account is present.
                    // Get the EIP-712 Signature and send the transaction
                    walletWeb3.currentProvider.send({
                    jsonrpc: "2.0",
                    id: 999999999999,
                    method: "eth_signTypedData_v4",
                    params: [fromAddr, dataToSign]
                },function(error, response) {
                    // Check github repository for getSignatureParameters helper method
                    let { r, s, v } = getSignatureParameters(response.result);

                    let tx = contract.methods.executeMetaTransaction(fromAddr,
                    functionSignature, r, s, v)
                    .send({from: fromAddr});

                    tx.on("transactionHash", function(hash) {
                    // Handle transaction hash
                }).once("confirmation", function(confirmationNumber, receipt) {
                    // Handle confirmation
                        alert(confirmationNumber);
                }).on("error", function(error) {
                    // Handle error
                        alert("ERROR: " + JSON.stringify(error));
                });

                }
                    );
}

export async function tokenAllowance(from, exchangeAddress) {
    //const vTContractAddress = config.mumbai_contract_addresses.vt_contract;

    const vTContractAddress = config.rinkeby_contract_addresses.vt_contract;

    let vTABI = new walletWeb3.eth.Contract(vTJSON, vTContractAddress);


    //TODO: Figure out why from is wrong
    //alert(from);

    //alert(await vTABI.methods.allowance(from, exchangeAddress).call());
    //alert(await vTABI.methods.allowance(from, exchangeAddress).call());

    let infinite_approve_amount = '115792089237316195423570985008687907853269984665640564039457584007913129639935'; //(2^256 - 1 )

    alert(from + " " + exchangeAddress)
    let tx = await vTABI.methods.allowance(from, exchangeAddress).call();
    alert(tx);

    // await tx.on("transactionHash", function (hash) {
    //     console.log(`Transaction hash is ${hash}`);
    //     alert(`Transaction sent. Waiting for confirmation ..`);
    // }).once("confirmation", function (confirmationNumber, receipt) {
    //     console.log(receipt);
    //     console.log(receipt.transactionHash);
    //     //do something with transaction hash
    // });

    await console.log(JSON.stringify(tx))

    return tx;
    //await console.log(JSON.stringify(tx))
}

export async function balanceOf(from) {
    //const vTContractAddress = config.mumbai_contract_addresses.vt_contract;

    const vTContractAddress = config.rinkeby_contract_addresses.vt_contract;

    let vTABI = new walletWeb3.eth.Contract(vTJSON, vTContractAddress);


    //TODO: Figure out why from is wrong

    let tx = await vTABI.methods.balanceOf(from).call();

    // await tx.on("transactionHash", function (hash) {
    //     console.log(`Transaction hash is ${hash}`);
    //     alert(`Transaction sent. Waiting for confirmation ..`);
    // }).once("confirmation", function (confirmationNumber, receipt) {
    //     console.log(receipt);
    //     console.log(receipt.transactionHash);
    //     //do something with transaction hash
    // });

    await console.log(JSON.stringify(tx))

    return tx;
    //await console.log(JSON.stringify(tx))
}

/**************************************
 * Original Non-Gassless Approve Call *
 **************************************/

export async function approveRegular(from, exchangeAddress) {
    //const vTContractAddress = config.mumbai_contract_addresses.vt_contract;

    const vTContractAddress = config.rinkeby_contract_addresses.vt_contract;

    let vTABI = new walletWeb3.eth.Contract(vTJSON, vTContractAddress);

    //TODO: Figure out why from is wrong
    //alert(from);

    //alert(await vTABI.methods.allowance(from, exchangeAddress).call());
    //alert(await vTABI.methods.allowance(from, '0xE88F4ae472687ce2026eb2d587C5C0c42a5F2047').call());

    let infinite_approve_amount = '115792089237316195423570985008687907853269984665640564039457584007913129639935'; //(2^256 - 1 )
    
    alert(from + " " + exchangeAddress);
    let tx = await vTABI.methods.approve(exchangeAddress, infinite_approve_amount).send({from: from, signatureType: biconomy.EIP712_SIGN});

    // await tx.on("transactionHash", function (hash) {
    //     console.log(`Transaction hash is ${hash}`);
    //     alert(`Transaction sent. Waiting for confirmation ..`);
    // }).once("confirmation", function (confirmationNumber, receipt) {
    //     console.log(receipt);
    //     console.log(receipt.transactionHash);
    //     //do something with transaction hash
    // });

    await console.log(JSON.stringify(tx))

    return tx;
    //await console.log(JSON.stringify(tx))
}