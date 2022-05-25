import { ethers } from "ethers";
import type { NextPage } from "next";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../components";
import Capture from "../components/capture";
import Welcome from "../components/welcome";
import { buildMetadata, TRANSACTION_URL, uploadToIPFS } from "../helpers";

const Home: NextPage = () => {
  const [image, setImage] = useState<File | null>();
  const [transactionHash, setTransactionHash] = useState<string | null>();

  async function createRelease(data: Data) {
    // Descontruct track name and identifier from form data
    const { name, photographer_wallet, mint_price, image } = data;

    setImage(image);

    // Pass through the form data to build up the metadata object
    const metadata: Metadata = buildMetadata(data);

    console.log({ metadata });

    // Upload the metadata object returned from the buildMetadata function to IPFS
    const ipfsData = await toast.promise(uploadToIPFS(metadata), {
      loading: "Uploading photo...",
      success: "Photo successfully uploaded",
      error: "Error uploading photo",
    });

    console.log({ ipfsData });

    // If the user has connected their wallet, continue.

    try {
      const params = new URLSearchParams({
        name,
        metadataURL: ipfsData.url,
        mint_price: ethers.utils.parseEther(mint_price.toString()).toString(),
        photographer_wallet,
      });

      await toast.promise(
        fetch(`/api/mint?${params}`)
          .then((res) => res.json())
          .then((res) => setTransactionHash(res.instance.transactionHash))
          .catch((e) => console.log("e =>", e)),
        {
          loading: `minting NFT...`,
          success: "Photo minted! 🚀",
          error: "Error minting NFT, please try again...",
        },
        { position: "bottom-right" }
      );
    } catch (e) {
      console.log({ e });
    }
  }

  function reset() {
    setTransactionHash(null);
    setImage(null);
  }

  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true);

  return (
    <>
      <Welcome onClose={() => setIsWelcomeOpen(false)} />

      {!isWelcomeOpen && (
        <Capture
          image={image}
          setImage={setImage}
          createRelease={createRelease}
        />
      )}

      {transactionHash && (
        <div className="flex h-screen flex-col items-center justify-center space-y-5">
          <h3 className="text-5xl font-semibold">Success!</h3>
          {image && <img className="w-96" src={URL.createObjectURL(image)} />}
          <p>Head to the Open Format playroom to see your NFT photo.</p>
          <div className="flex space-x-2">
            <a
              href={TRANSACTION_URL(transactionHash)}
              target="_blank"
              rel="noreferrer"
            >
              <Button>View Transaction</Button>
            </a>
            <Button onClick={reset}>Create New NFT</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
