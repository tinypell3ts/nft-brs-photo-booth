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
  const { track_description, track_audio, track_name, track_artwork } = data;
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
    name: track_name,
    description: track_description,
    image: new File([track_artwork[0]], track_artwork[0].name, {
      type: track_artwork[0].type,
    }),
    audio: new File([track_audio[0]], track_audio[0].name, {
      type: track_audio[0].type,
    }),
    release_type: "audio",
    factory_id: FACTORY_ID,
  };

  return metadata;
}
