// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";
import OpenFormat from "../../abis/OpenFormat.json";
import { PRIVATE_KEY, RPC_URL } from "../../constants";
type Data = {
  instance: ethers.providers.TransactionReceipt;
  shares: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (!PRIVATE_KEY || !RPC_URL) throw Error("PRIVATE_KEY or RPC_URL not set.");

  try {
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

    const signer = new ethers.Wallet(PRIVATE_KEY, provider);

    const factory = new ethers.ContractFactory(
      OpenFormat.abi,
      OpenFormat.bytecode,
      signer
    );

    if (!req.query.name || !req.query.metadataURL || !req.query.mint_price) {
      throw Error("missing name, metadataURL or mint_price parameters");
    }

    const tx = await factory.deploy(
      req.query.name, // name - Required, The name of the track
      "NFTBRS", // symbol - Required - The blockchain identifier for this NFT. e.g. BAYC
      req.query.metadataURL, // URL - Required, an IPFS url for the metadata
      1, // Max Supply - This is the total amount of NFT available for minting.
      req.query.mint_price // Minting Price - The price (in Wei) it costs in mint an NFT
    );

    const instance = await tx.deployTransaction.wait();

    const contract = new ethers.Contract(
      instance.contractAddress,
      OpenFormat.abi,
      signer
    );

    let shares = 0;

    if (ethers.utils.isAddress(req.query.photographer_wallet)) {
      const allocate = await contract.allocateShares(
        [req.query.photographer_wallet],
        [50]
      );
      await allocate.wait();
      const allocatedShares = await contract.shares(
        req.query.photographer_wallet
      );

      shares = ethers.BigNumber.from(allocatedShares).toNumber();
    }

    return res.json({ instance, shares });
  } catch (e) {
    return res.json({ e });
  }
}
