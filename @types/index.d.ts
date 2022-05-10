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
  track_name: string;
  track_identifier: string;
  track_description: string;
  track_artwork: File[];
  track_audio: File[];
};

type Metadata = {
  name: string;
  description: string;
  image: File;
  audio: File;
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
