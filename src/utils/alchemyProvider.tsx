import { AlchemyProvider } from "@alchemy/aa-alchemy";
import {
  LightSmartContractAccount,
  getDefaultLightAccountFactoryAddress,
} from "@alchemy/aa-accounts";
import { sepolia } from "viem/chains";
import { web3authSigner } from "./web3auth";

const chain = sepolia;
const apiKey = "B6mA7MAJxeH7HfC-s2M97yzjWHGJW2Lb"

export const provider = async () => {

  const signer = await web3authSigner();
  if (signer)
    return new AlchemyProvider({
      apiKey,
      chain,
    }).connect(
      (rpcClient) =>
        new LightSmartContractAccount({
          chain,
          owner: signer,
          factoryAddress: getDefaultLightAccountFactoryAddress(chain),
          rpcClient,
        })
    )
}
