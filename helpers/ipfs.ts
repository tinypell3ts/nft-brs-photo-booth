import { File, NFTStorage } from "nft.storage";

const client = new NFTStorage({
  token: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN,
});

export async function uploadToIPFS(data: Metadata) {
  if (!data) throw Error("Data is invalid");
  return await client.store(data);
}

/**
 * The function builds up a metadata object in a format accepted
 * by the uploadToIPFS function above.
 * Name, description and Image are REQUIRED
 * You can add any metadata you want here. Each file will be uploaded
 * with it's own IPFS CID linking back to the generated metadata.json.
 */
export function buildMetadata(data: Data): Metadata {
  const { name, photographer_wallet, photographer_name, image, description } =
    data;
  // generate a random factory ID
  const FACTORY_ID = process.env.NEXT_PUBLIC_FACTORY_ID;
  // throw error if factory ID is not set or invalid;
  if (!FACTORY_ID || typeof FACTORY_ID !== "string") {
    throw Error(
      "Invalid Factory ID: Check NEXT_PUBLIC_FACTORY_ID in your .env.local"
    );
  }

  // name, description and image are required by nft.storage.
  const metadata = {
    name,
    description: description ?? "NFT:BRS",
    image: new File([image[0]], image[0].name, {
      type: image[0].type,
    }),
    photographer_wallet,
    ...(photographer_name && { photographer_name }),
    release_type: "image",
    factory_id: FACTORY_ID,
  };

  return metadata;
}
