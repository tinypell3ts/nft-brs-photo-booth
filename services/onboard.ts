import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/react";
import walletConnectModule from "@web3-onboard/walletconnect";
import { getNetwork } from "../helpers";

const walletConnect = walletConnectModule();
const injected = injectedModule();

// Get the chain_id from .env.local
const NETWORK_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10);

// Fetch the chain information based on the chain_id;
const network = getNetwork(NETWORK_ID);

export default init({
  wallets: [injected, walletConnect],
  chains: [
    {
      id: network.chainId,
      token: network.nativeCurrency.symbol,
      label: network.chainName,
      rpcUrl: network.rpcUrl,
    },
  ],
  appMetadata: {
    name: "Ethereum Base",
    icon: "<svg><svg/>",
    description: "Ethereum base website",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
    ],
  },
});
