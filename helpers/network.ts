import networks from "./networkParams.json";

const NETWORK_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10);

const BLOCK_EXPLORER_URL = (address: string) => {
  return `${getNetwork(NETWORK_ID).blockExplorerUrl}/address/${address}`;
};

const TRANSACTION_URL = (tx: string) => {
  return `${getNetwork(NETWORK_ID).blockExplorerUrl}/tx/${tx}`;
};

function getNetwork(NETWORK_ID: number): Network {
  switch (NETWORK_ID) {
    case 80001:
      return networks?.polygon_mumbai;
    case 137:
      return networks?.polygon_mainnet;
    default:
      return networks?.polygon_mumbai;
  }
}

export { getNetwork, NETWORK_ID, BLOCK_EXPLORER_URL, TRANSACTION_URL };
