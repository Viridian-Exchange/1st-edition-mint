import config from "../local-dev-config";
import vNFTJSON from "../abis/ViridianGenesisPass.json";
import {Biconomy} from "@biconomy/mexa";
import Web3 from "web3";

let web3Wallet = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider( "https://eth-rinkeby.alchemyapi.io/v2/LAxJKtplSWDfvNU0-v7K77WOeCWYb4Js"));

const biconomy = new Biconomy(Web3.givenProvider || new Web3.providers.HttpProvider( "https://eth-rinkeby.alchemyapi.io/v2/LAxJKtplSWDfvNU0-v7K77WOeCWYb4Js"),{apiKey: "TVCsgQVfk.a6031565-1cb6-40da-8a60-2ffec22e3bed", debug: true});

let biconomyWeb3 = new Web3(biconomy);

biconomy.onEvent(biconomy.READY, () => {
    // Initialize your dapp here like getting user accounts etc
    console.log("initialized");
}).onEvent(biconomy.ERROR, (error, message) => {
    // Handle error while initializing mexa
    console.error(error);
});

// export async function tokenURI(tokenId) {
//     const vNFTContractAddress = config.mumbai_contract_addresses.vnft_contract;
//
//     let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
//     //console.log("ABIMETHODS: " + tokenId);
//     let nft = vNFTABI.methods.tokenURI(tokenId).call();
//
//     //alert(nft);
//
//     return nft;
// }
//
// export async function ownerOf(tokenId) {
//     const vNFTContractAddress = config.mumbai_contract_addresses.vnft_contract;
//
//     let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
//     //console.log("ABIMETHODS1: " + tokenId);
//     let owner = await vNFTABI.methods.ownerOf(tokenId).call();
//
//     //alert(nft);
//
//     return owner;
// }
//
// export async function ownerOfNoReq(tokenId) {
//     const vNFTContractAddress = config.mumbai_contract_addresses.vnft_contract;
//
//     let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
//     //console.log("ABIMETHODS2: " + tokenId);
//     let owner = await vNFTABI.methods.ownerOf(tokenId).call();
//
//     //alert(nft);
//
//     return owner;
// }
//
// export async function setApprovalForAll(from, exchangeAddress) {
//     //alert("Setting approval to " + from + " for " + exchangeAddress);
//     const vNFTContractAddress = config.mumbai_contract_addresses.vnft_contract;
//
//     let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
//     return await vNFTABI.methods.setApprovalForAll(exchangeAddress, true).send({from: from});
// }

export async function mint(from, numMint) {
    //alert("Setting approval to " + from + " for " + exchangeAddress);
    const vNFTContractAddress = config.rinkeby_contract_addresses.vgp_contract;

    let vNFTABI = new biconomyWeb3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
    return await vNFTABI.methods.mint(from, numMint).send({from: from, /*value: (100000000000000000 * numMint).toString(),*/ signatureType: biconomy.EIP712_SIGN});
}

// export async function bridge(from, bridgeNFTs) {
//     //alert("Setting approval to " + from + " for " + exchangeAddress);
//     const vNFTContractAddress = config.rinkeby_contract_addresses.v1ep_contract;
//
//     let vNFTABI = new biconomyWeb3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
//     return await vNFTABI.methods.bridge(bridgeNFTs).send({from: from});
// }

export async function totalSupply(from) {
    //alert("Setting approval to " + from + " for " + exchangeAddress);
    const vNFTContractAddress = config.rinkeby_contract_addresses.vgp_contract;

    let vNFTABI = new web3Wallet.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
    return await vNFTABI.methods.totalSupply().call();
    //return await vNFTABI.methods.getNumNFTs().call();
}

export async function getOwnedNFTs(from) {
    //alert("Setting approval to " + from + " for " + exchangeAddress);
    const vNFTContractAddress = config.rinkeby_contract_addresses.vgp_contract;
    //alert(from)
    let vNFTABI = new web3Wallet.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
    let ownedNFTS = await vNFTABI.methods.getOwnedNFTs().call({from: from});
    //alert(ownedNFTS);
    return ownedNFTS;
}

//
// export async function isApprovedForAll(owner, operator) {
//     const vNFTContractAddress = config.mumbai_contract_addresses.vnft_contract;
//
//     let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
//
//     return await vNFTABI.methods.isApprovedForAll(owner, operator).call();
// }

// export async function safeTransferFrom(from, to, tokenId) {
//     //alert("Setting approval to " + from + " for " + exchangeAddress);
//     const vNFTContractAddress = config.mumbai_contract_addresses.vnft_contract;
//
//     let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
//
//     return await vNFTABI.methods.safeTransferFrom(from, to, tokenId).send({from: from});
// }
//
// export async function burn(from, tokenId) {
//     //alert("Setting approval to " + from + " for " + exchangeAddress);
//     const vNFTContractAddress = config.mumbai_contract_addresses.vnft_contract;
//
//     let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
//
//     return await vNFTABI.methods.burn(tokenId).send({from: from, signatureType: biconomy.EIP712_SIGN});
// }