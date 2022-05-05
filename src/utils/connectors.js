import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";

export const CoinbaseWallet = new WalletLinkConnector({
    url: `https://eth-rinkeby.alchemyapi.io/v2/LAxJKtplSWDfvNU0-v7K77WOeCWYb4Js`,
    appName: "Viridian Genesis Drop",
    supportedChainIds: [1, 3, 4, 5, 42],
});

export const WalletConnect = new WalletConnectConnector({
    rpcUrl: `https://eth-rinkeby.alchemyapi.io/v2/LAxJKtplSWDfvNU0-v7K77WOeCWYb4Js`,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
});

export const Injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42]
});