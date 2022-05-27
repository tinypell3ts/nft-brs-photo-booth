import { ethers } from "ethers";
import type { NextPage } from "next";
import { useState } from "react";
import toast from "react-hot-toast";
import Capture from "../components/capture";
import Complete from "../components/complete";
import Welcome from "../components/welcome";
import { buildMetadata, uploadToIPFS } from "../helpers";

const Home: NextPage = () => {
  const [image, setImage] = useState<File | null>();
  const [transactionHash, setTransactionHash] = useState<string | null>();
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true);
  const [isCreatingRelease, setIsCreatingRelease] = useState(false);
  const isComplete = !!transactionHash && image;

  async function createRelease(data: Data) {
    try {
      setIsCreatingRelease(true);

      // Descontruct track name and identifier from form data
      const { name, photographer_wallet, mint_price, image } = data;
      if (photographer_wallet && !ethers.utils.isAddress(photographer_wallet)) {
        return toast.error("Invalid ethereum address");
      }

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

      const params = new URLSearchParams({
        name,
        metadataURL: ipfsData.url,
        mint_price: ethers.utils.parseEther(mint_price.toString()).toString(),
        photographer_wallet,
      });

      await toast.promise(
        fetch(`/api/mint?${params}`)
          .then((res) => res.json())
          .then((res) => setTransactionHash(res.instance.transactionHash)),
        {
          loading: `minting NFT...`,
          success: "Photo minted! 🚀",
          error: "Error minting NFT, please try again...",
        }
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Couldn't mint your NFT";

      toast.error(message);
    } finally {
      setIsCreatingRelease(false);
    }
  }

  function reset() {
    setTransactionHash(null);
    setImage(null);
  }

  return (
    <>
      {isComplete ? (
        <Complete
          transactionHash={transactionHash}
          image={image}
          onReset={reset}
        />
      ) : (
        <>
          <Welcome onClose={() => setIsWelcomeOpen(false)} />

          {!isWelcomeOpen && (
            <Capture
              image={image}
              setImage={setImage}
              createRelease={createRelease}
              isLoading={isCreatingRelease}
            />
          )}
        </>
      )}
    </>
  );
};

export default Home;
