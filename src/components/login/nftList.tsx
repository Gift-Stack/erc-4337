import { ThirdwebNftMedia, Web3Button } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import React from "react";

type NftListProps = {
  nfts: NFT[];
  address: string;
  contractAddress: string;
  isLoading: boolean;
  showQuantity?: boolean;
};

const NftList = ({
  nfts,
  isLoading,
  address,
  contractAddress,
  showQuantity = true,
}: NftListProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
      {isLoading
        ? "Loading..."
        : nfts?.map((nft) => (
            <div
              key={nft.metadata.id}
              className="border border-[#222] bg-[#131313] text-left rounded-xl max-w-[440px] overflow-hidden min-h-[100px] p-2.5"
            >
              <ThirdwebNftMedia
                metadata={nft.metadata}
                className="!w-full h-auto rounded-tr-1 mb-3- border-none"
              />

              {address ? (
                <>
                  <p className="text-center text-sm w-full mb-2.5">
                    {showQuantity && `You own ${nft?.quantityOwned || "0"}`}{" "}
                    {nft?.metadata?.name ?? "GiFTED! NFTs"}
                  </p>

                  <Web3Button
                    contractAddress={contractAddress}
                    action={(contract) =>
                      contract.erc1155.claim(nft.metadata.id.toString(), 1)
                    }
                    onSuccess={async () => {
                      alert("Claim successful!");
                    }}
                    className="!w-full mt-2.5"
                  >
                    Claim!
                  </Web3Button>
                </>
              ) : (
                <p className="text-center w-full mt-2.5">
                  Login to claim this NFT!
                </p>
              )}
            </div>
          ))}
    </div>
  );
};

export default NftList;
