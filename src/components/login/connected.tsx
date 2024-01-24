/* eslint-disable @next/next/no-img-element */
import {
  THIRDWEB_CLIENT_ID,
  chain,
  GIFTED_CONTRACT_ADDRESS,
} from "@/lib/web3/constants";
import { truncateAddress } from "@/lib/web3/helper";
import { ThirdwebSDKProvider } from "@thirdweb-dev/react";
import {
  useAddress,
  useContract,
  useNFTs,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { Signer } from "ethers";
import React, { useState } from "react";
import NftList from "./nftList";
import ShopModal from "./modal";

const Connected = (props: { signer: Signer; username: string }) => {
  return (
    <ThirdwebSDKProvider
      signer={props.signer}
      activeChain={chain}
      clientId={THIRDWEB_CLIENT_ID}
    >
      <NFTComponent />
    </ThirdwebSDKProvider>
  );
};

export default Connected;

export const NFTComponent = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const address = useAddress();
  const truncatedAddress = truncateAddress(address!);
  const { contract: giftedContract } = useContract(GIFTED_CONTRACT_ADDRESS);
  const { data: nfts, isLoading: isNftLoading } = useNFTs(giftedContract);
  const { data: ownedNfts } = useOwnedNFTs(giftedContract, address);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex items-center justify-center my-8 gap-3">
        <img src="/patch_wallet_logo.svg" width={168} alt="Patch Wallet Logo" />
      </div>

      <div className="w-full">
        <p className="text-3xl font-semibold text-left mb-2">User Profile</p>
        <p className="mb-4">Welcome back {truncatedAddress}</p>
        <div className="px-3 py-3 border border-[#222] bg-[#131313] rounded-xl text-sm flex items-center justify-between mb-5">
          <p>Your Token Balance: 0.0 </p>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#222] border border-[#555] rounded p-3"
          >
            Shop interior stuffs
          </button>
        </div>

        <NftList
          isLoading={isNftLoading}
          contractAddress={GIFTED_CONTRACT_ADDRESS}
          nfts={ownedNfts!}
          address={address!}
        />
      </div>

      {modalOpen && (
        <ShopModal
          address={address!}
          contractAddress={GIFTED_CONTRACT_ADDRESS}
          nfts={nfts!}
          isLoading={isNftLoading}
          onClose={() => setModalOpen(false)}
          showQuantity={false}
        />
      )}
    </div>
  );
};
