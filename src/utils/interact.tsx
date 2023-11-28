import { encodeFunctionData } from "viem";
import { provider } from "./alchemyProvider.js";
import contractABI from '../assets/contractABI.json'

// this is an example ABI for a contract with a "mint" function
const abi = contractABI


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
                target: "0x9D4cCb21b17658A7E3220933EE3BeC839f80403c",
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
