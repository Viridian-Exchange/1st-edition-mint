export const switchNetwork = async (library) => {
    try {
        alert('switching networks')
        await library.provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x01' }], // chainId must be in hexadecimal numbers
        });
    } catch (switchError) {
        alert(switchError.code);
        // 4902 error code indicates the chain is missing on the wallet
        if (switchError.code === 4902) {
            try {
                await library.provider.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainName: 'Polygon Mumbai Testnet',
                            chainId: '0x13881',
                            nativeCurrency: {
                                name: 'Polygon',
                                symbol: 'MATIC',
                                decimals: 18
                            },
                            rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
                            blockExplorerUrls: ['https://mumbai.polygonscan.com/']
                        },
                    ],
                });
            } catch (error) {
                console.error(error)
            }
        }
    }
};