import type { OnboardAPI } from "@web3-onboard/core";
import { useConnectWallet, useWallets } from "@web3-onboard/react";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { initOnboard } from "../services";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  /**
   * @dev We use Onboard (https://docs.blocknative.com/onboard) to handle wallet (e.g. Metamask)
   * interactions. We store the connectedWallets in localStorage so the user doesn't need
   * to reconnect everytime. Most of the code on this page is handling this wallet connectivity.
   * Onboard can be swapped out for any other packages/code to handle wallet interactions.
   */
  const [{ wallet }, connect] = useConnectWallet();
  const connectedWallets = useWallets();
  const [onboard, setOnboard] = useState<OnboardAPI>();

  useEffect(() => {
    setOnboard(initOnboard);
  }, []);

  useEffect(() => {
    if (!connectedWallets.length) return;

    const connectedWalletsLabelArray = connectedWallets.map(
      ({ label }) => label
    );
    window.localStorage.setItem(
      "connectedWallets",
      JSON.stringify(connectedWalletsLabelArray)
    );
  }, [connectedWallets]);

  useEffect(() => {
    const previouslyConnectedWallets = JSON.parse(
      window.localStorage.getItem("connectedWallets")
    );

    if (previouslyConnectedWallets?.length) {
      async function setWalletFromLocalStorage() {
        await connect({ autoSelect: previouslyConnectedWallets[0] });
      }
      setWalletFromLocalStorage();
    }
  }, [onboard, connect]);

  useEffect(() => {
    if (!wallet?.provider) {
      window.localStorage.removeItem("connectedWallets");
    }
  }, [wallet]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Component {...pageProps} />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default MyApp;
