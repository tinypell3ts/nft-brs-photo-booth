type Network = {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrl: string;
  blockExplorerUrl: string;
  iconUrl: string;
};

type Wallet = {
  provider: ethers.providers.ExternalProvider;
};

type Data = {
  name: string;
  photographer_name: string;
  photographer_wallet: string;
  mint_price: number;
  description: string;
  image: any;
};

type Metadata = {
  name: string;
  description: string;
  image: File;
  release_type: string;
  factory_id: string;
};

type Release = {
  id: string;
  creator: {
    id: string;
  };
  properties: Property[];
};

type Property = {
  key: string;
  value: string;
};
