import { ThirdwebSDK, isContractDeployed } from "@thirdweb-dev/sdk";
import { SmartWallet, LocalWallet } from "@thirdweb-dev/wallets";
import {
  chain,
  factoryAddress,
  GIFTED_CONTRACT_ADDRESS,
  THIRDWEB_CLIENT_ID,
} from "./constants";
import { localWallet, smartWallet } from "@thirdweb-dev/react";

export const smartWalletConfig = smartWallet(localWallet(), {
  factoryAddress,
  gasless: true,
});

export const createSmartAccount = (): SmartWallet => {
  const smartWallet = new SmartWallet({
    chain,
    factoryAddress,
    gasless: true,
    clientId: THIRDWEB_CLIENT_ID,
  });

  return smartWallet;
};

export const connectToSmartWallet = async (
  username: string,
  password: string,
  statusCallback: (status: string) => void
): Promise<SmartWallet> => {
  statusCallback("Searching for account...");
  const smartWallet = createSmartAccount();
  const personalWallet = new LocalWallet();

  await personalWallet.loadOrCreate({
    strategy: "encryptedJson",
    password,
  });

  await smartWallet.connect({ personalWallet });
  const sdk = await ThirdwebSDK.fromWallet(smartWallet, chain, {
    clientId: THIRDWEB_CLIENT_ID,
  });

  const address = await sdk.wallet.getAddress();
  const isDeployed = await isContractDeployed(address, sdk.getProvider());

  if (!isDeployed) {
    statusCallback("New account detected...");
    const giftedContract = await sdk.getContract(GIFTED_CONTRACT_ADDRESS);

    statusCallback("Creating new account...");
    const tnx = await giftedContract.erc1155.claim.prepare("0", 1);

    const hash = await smartWallet.execute(tnx);
    statusCallback("Sending starter token...");
  } else {
    statusCallback("Account found! Loading NFTs...");
  }

  return smartWallet;
};
