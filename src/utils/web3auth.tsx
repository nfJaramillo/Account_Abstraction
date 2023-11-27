import { Web3Auth } from "@web3auth/modal";

// Initialize within useEffect()
const web3auth = new Web3Auth({
    clientId: "BP3xQx3XZWVITcgANBE6BnuCrsxS7Z6flGozW711VnCPQ5YPBjv7I9xz0Qvi2-FnoK3EhbSmQmA4jbgEKpYKu8s", // Get your Client ID from the Web3Auth Dashboard
    web3AuthNetwork: "sapphire_mainnet", // Web3Auth Network
    chainConfig: {
        chainNamespace: "eip155",
        chainId: "0xaa36a7",
        rpcTarget: "https://eth-sepolia.g.alchemy.com/v2/B6mA7MAJxeH7HfC-s2M97yzjWHGJW2Lb",
        displayName: "Sepolia",
        blockExplorer: "https://sepolia.etherscan.i",
        ticker: "ETH",
        tickerName: "Ethereum",
    },
});

export const initWeb3Auth = async () => {
    await web3auth.initModal()
}

export const connectWeb3Auth = async () => {
    await web3auth.connect()
}

export const isConnected = async () => {
    return await web3auth.connected
}


