"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { connectToSmartWallet, smartWalletConfig } from "@/lib/web3/wallet";
import { Footer } from "../footer";
import { Signer } from "ethers";
import Connected from "./connected";
import ErrorComponent from "./error";
import Loading from "./loading";
import { LocalWallet } from "@thirdweb-dev/wallets";
import { useConnect } from "@thirdweb-dev/react";
import { chain } from "@/lib/web3/constants";

export const Login = () => {
  const connect = useConnect();
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  const [signer, setSigner] = useState<Signer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("");
  const [error, setError] = useState("");

  const { username, password } = loginInfo;
  const connected = username && signer;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const loadLocalWalletAndConnect = async () => {
    if (!password) {
      setError("Please enter a password");
      return;
    }
    setError("");
    try {
      setIsLoading(true);
      setLoadingStatus("Searching for account...");
      const personalWallet = new LocalWallet({
        chain,
      });
      await personalWallet.loadOrCreate({
        strategy: "encryptedJson",
        password: password,
      });
      const wallet = await connect(smartWalletConfig, {
        personalWallet: personalWallet,
      });
      const s = await wallet.getSigner();
      setSigner(s);
      setLoadingStatus("Account found! Loading NFTs...");
      setTimeout(() => setIsLoading(false), 2000);
    } catch (e) {
      setError((e as any).message);
    }
  };

  const connectWallet = async () => {
    if (!username || !password) return;
    try {
      setIsLoading(true);
      const wallet = await connectToSmartWallet(username, password, (status) =>
        setLoadingStatus(status)
      );
      const s = await wallet.getSigner();
      setSigner(s);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.error(e);
      setError((e as any).message);
    }
  };

  if (connected) {
    return <Connected signer={signer} username={username} />;
  }
  if (isLoading) {
    return <Loading loadingStatus={loadingStatus} />;
  }
  if (error) {
    return <ErrorComponent error={error} setError={setError} />;
  }
  return (
    <div className="w-full max-w-xl mx-auto h-[70svh] flex flex-col py-0 px-6 text-white">
      <div className="flex items-center justify-center my-8 gap-3">
        <img src="/patch_wallet_logo.svg" width={168} alt="Patch Wallet Logo" />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          connectWallet();
          // loadLocalWalletAndConnect();
        }}
        className="w-full flex-1 flex flex-col justify-center items-center"
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full h-12 text-[#000] rounded border-none px-4 mb-4 text-base"
          value={username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full h-12 text-[#000] rounded border-none px-4 mb-4 text-base"
          value={password}
          onChange={handleInputChange}
        />
        <button
          className="w-full h-12 rounded-[5px] border-none text-base my-4 text-white text-center bg-orange-main font-semibold hover:opacity-80 active:opacity-80 focus:opacity-80"
          type="submit"
        >
          Login
        </button>
      </form>
      <Footer />
    </div>
  );
};
