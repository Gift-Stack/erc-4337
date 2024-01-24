import {
  THIRDWEB_CLIENT_ID,
  chain,
  factoryAddress,
} from "@/lib/web3/constants";
import "@/styles/globals.css";
import {
  ThirdwebProvider,
  smartWallet,
  embeddedWallet,
} from "@thirdweb-dev/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={THIRDWEB_CLIENT_ID}
      activeChain={chain}
      supportedWallets={[
        smartWallet(embeddedWallet(), {
          factoryAddress,
          gasless: true,
        }),
      ]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
