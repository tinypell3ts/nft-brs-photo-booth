import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";
import type { NextPage } from "next";
import toast from "react-hot-toast";
import OpenFormatContract from "../abis/OpenFormat.json";
import { ReleaseList } from "../components";
import { ReleaseForm } from "../forms";
import { buildMetadata, uploadToIPFS } from "../helpers";

const Home: NextPage = () => {
  // get the connected wallet
  const [{ wallet }] = useConnectWallet();

  async function createRelease(data: Data) {
    // Descontruct track name and identifier from form data
    const { track_name, track_identifier } = data;

    // Pass through the form data to build up the metadata object
    const metadata: Metadata = buildMetadata(data);

    console.log({ metadata });

    // Upload the metadata object returned from the buildMetadata function to IPFS
    const ipfsData = await toast.promise(uploadToIPFS(metadata), {
      loading: "Uploading track data...",
      success: "Track data uploaded",
      error: "Error uploading track",
    });

    console.log({ ipfsData });

    // If the user has connected their wallet, continue.
    if (wallet?.provider) {
      try {
        // The provider allows us to interact with the blockchain.
        const provider = new ethers.providers.Web3Provider(wallet.provider);

        // Every transasction needs to be signed. In this case, the signer is the connected wallet.
        const signer = provider.getSigner();

        // create an instance of the factory contract with the ABI, Bytecode and Signer.
        const factory = new ethers.ContractFactory(
          OpenFormatContract.abi,
          OpenFormatContract.bytecode,
          signer
        );

        // setup on screen notifications using react-hot-toast and
        // call the deploy function on the factory contract.
        const contract = await toast.promise(
          factory.deploy(
            track_name, // name - Required, The name of the track
            track_identifier, // symbol - Required - The blockchain identifier for this NFT. e.g. BAYC
            ipfsData.url, // URL - Required, an IPFS url for the metadata
            100, // Max Supply - This is the total amount of NFT available for minting.
            ethers.utils.parseEther("0.01") // Minting Price - The price (in Wei) it costs in mint an NFT
          ),
          {
            loading: "Open metamask to confirm the transaction",
            success: "Transaction confirmed",
            error: "Transaction Error",
          }
        );

        // Once, the transaction has been confirmed in Metamask, we wait for it to be successful.
        await toast.promise(contract.deployTransaction.wait(), {
          loading: "Pending track release...",
          success: "Track released!",
          error: "Error releasing track",
        });
      } catch (e) {
        console.log({ e });
      }
    }
  }
  return (
    <div>
      <h1 className="text-2xl font-bold">Create a release</h1>
      <ReleaseForm onSubmit={(data) => createRelease(data)} />
      <h1 className="text-2xl font-bold">Releases</h1>
      <ReleaseList />
    </div>
  );
};

export default Home;
