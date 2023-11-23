import { Web3Auth } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

// Initialize within useEffect()
const clientId = "BP3xQx3XZWVITcgANBE6BnuCrsxS7Z6flGozW711VnCPQ5YPBjv7I9xz0Qvi2-FnoK3EhbSmQmA4jbgEKpYKu8s" // Get your Client ID from the Web3Auth Dashboard

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: "sapphire_devnet", // Web3Auth Network
  chainConfig: {
    chainNamespace: "eip155",
    chainId: "0xaa36a7",
    rpcTarget: "https://eth-sepolia.g.alchemy.com/v2/B6mA7MAJxeH7HfC-s2M97yzjWHGJW2Lb",
    displayName: "Sepolia",
    blockExplorer: "https://sepolia.etherscan.io",
    ticker: "ETH",
    tickerName: "Ethereum",
  },
});

const openloginAdapter = new OpenloginAdapter({
  adapterSettings: {
    clientId,
    uxMode: "popup",
    loginConfig: {
      // Google login
      google: {
        verifier: "AA-test", // Pass the Verifier name here
        typeOfLogin: "google", // Pass on the login provider of the verifier you've created
        clientId: "486475502545-05vf7qpre1cvaiqm5nc0b21ftdmijbse.apps.googleusercontent.com", // Pass on the Google `Client ID` here
      },
    },
  },
});


export const initWeb3Auth = async () => {
   web3auth.configureAdapter(openloginAdapter);
    await web3auth.initModal()
   
}

export const connectWeb3Auth = async () => {
  await web3auth.connect()  
}

