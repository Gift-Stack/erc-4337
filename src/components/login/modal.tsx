import React from "react";
import NftList from "./nftList";
import { NFT } from "@thirdweb-dev/sdk";
import Modal from "@/shared/modal";

type ModalProps = {
  onClose: () => void;
  nfts: NFT[];
  address: string;
  contractAddress: string;
  isLoading: boolean;
  showQuantity: boolean;
};

const ShopModal = (props: ModalProps) => {
  const { onClose, nfts, address, contractAddress, isLoading, showQuantity } =
    props;
  return (
    <Modal onClose={onClose}>
      <div className="">
        <div className="mb-5">
          <h1 className="text-3xl font-bold">Shop interior stuffs</h1>
          <h3>Select interior to buy:</h3>
        </div>

        <NftList
          isLoading={isLoading}
          contractAddress={contractAddress}
          nfts={nfts}
          address={address}
          showQuantity={showQuantity}
        />
      </div>
    </Modal>
  );
};

export default ShopModal;
