import { encodeFunctionData } from "viem";
import { provider, getAlchemy } from "./alchemyProvider.js";
import contractABI from '../assets/contractABI.json'
import { getInfo } from "./web3auth.js";
import { web3authSigner } from "./web3auth.js";
import { AccountBalance } from "@mui/icons-material";


const abi = contractABI
const contractAddress = "0x9D4cCb21b17658A7E3220933EE3BeC839f80403c"

const uoCallData = encodeFunctionData({
    abi,
    functionName: "purchase",
    args: [15, 1],
});

export const getNFT = async () => {
    try {
        const connectedProvider = await provider();
        if (connectedProvider) {
            connectedProvider.withAlchemyGasManager({
                policyId: "8108516b-24b3-4fe7-bf7b-98a16d5948da", // replace with your policy id, get yours at https://dashboard.alchemy.com/
            });

            const uo = await connectedProvider.sendUserOperation({
                target: contractAddress,
                data: uoCallData,
            });

            const txHash = await connectedProvider.waitForUserOperationTransaction(uo.hash);

            console.log(txHash);

            return {
                success: true,
                severity: "success",
                status: "✅ Consulte su transacción en Etherscan: https://sepolia.etherscan.io/tx/" + txHash
            }
        }
        else {
            return {
                success: false,
                severity: "error",
                status: "😥 Algo salió mal con el proveedor"
            }
        }

    }
    catch (err: any) {
        return {
            success: false,
            severity: "error",
            status: "😥 Algo salió mal:" + err.message,
        };

    }
}



export const checkSelledNFT = async () => {
    try {
        let test = await provider()
        if (test) {
            const test2 = test.account
            if (test2) {
                console.log(test2)
            }
        }

        const address = (await getInfo()).email
        if (address) {
            const response = await getAlchemy().nft.getNftsForOwner(address, {
                omitMetadata: false,
                contractAddresses: [contractAddress]

            });
            return {
                success: true,
                severity: "success",
                status: JSON.stringify(response, null, 2)

            }
        }
        else {
            return {
                success: false,
                severity: "error",
                status: '😥 No se pudo obtener la dirección de la billetera'
            }

        }
    } catch (error: any) {
        if (error.message)
            return {
                success: false,
                severity: "error",
                status: "😥 Something went wrong: " + error.message
            }
    }
}
