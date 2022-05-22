const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_URL = process.env.RPC_URL;
const FACTORY_ID = process.env.NEXT_PUBLIC_FACTORY_ID;

const SUBGRAPH_ENDPOINT =
  "https://api.thegraph.com/subgraphs/name/simpleweb/open-format";

export { SUBGRAPH_ENDPOINT, RPC_URL, PRIVATE_KEY, FACTORY_ID };
