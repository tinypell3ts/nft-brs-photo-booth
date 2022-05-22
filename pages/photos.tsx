import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import OpenFormat from "../abis/OpenFormat.json";
import { Button, Header } from "../components";
import { useGetPhotos } from "../queries";

export default function Photos() {
  const { isLoading, error, data } = useGetPhotos(2000);
  const [{ wallet }] = useConnectWallet();

  /**
   * @dev The metadata from the subgraph are stored as key/value pairs.
   * @param property - A single property consisting of a key/value pair.
   * @param key - The key to lookup in a key/value pair.
   * @returns if it exists, a key/value pair of a single property.
   */
  function getMetadataValue(property: Property[], key: string) {
    if (!key) return new Error("OpenFormat: key not set");
    if (!property) return null;

    return property.find((m: Property) => m.key === key)?.value;
  }

  /**
   * @dev If a piece of metdata is stored on IPFS is it generally prefixed with ipfs://
   * Most browsers can't read this, so we need to use a IPFS gateway service and
   * replace the start of the URL.
   */

  function transformURL(url: string) {
    if (!url) return;
    return url.replace("ipfs://", "https://ipfs.infura.io/ipfs/");
  }

  if (isLoading || error) return <div></div>;

  function PhotoItem({ token }) {
    const name = getMetadataValue(token.properties, "name");
    const image = getMetadataValue(token.properties, "image");
    const description = getMetadataValue(token.properties, "description");
    const photographerName = getMetadataValue(
      token.properties,
      "photographer_name"
    );
    const salePrice = ethers.utils.formatEther(token.saleData.salePrice);
    const connectedWallet = wallet?.accounts[0].address;
    const soldOut = token.saleData.maxSupply === token.saleData.totalSold;

    return (
      <div key={token.id} className="group relative">
        <div className="min-h-80 aspect-w-1 aspect-h-1 relative w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
          <img
            src={transformURL(image)}
            alt={name}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
          <div className="group"></div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href={token.href}>
                <span aria-hidden="true" className="absolute inset-0" />
                {name}
                <span className="text-xs">
                  {" "}
                  {photographerName != undefined
                    ? `by ${photographerName}`
                    : null}
                </span>
              </a>
            </h3>
            <div>
              <p className="mt-1 text-sm text-gray-500">{description}</p>

              <p className="text-sm text-gray-500">{salePrice} MATIC</p>
            </div>
          </div>
          <div className="z-10 flex flex-col items-end">
            <Button
              onClick={() => handleMint(token.id, token.saleData.salePrice)}
              disabled={!connectedWallet || soldOut}
            >
              {soldOut ? "Sold Out" : "Buy"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  async function handleMint(contractAddress: string, mintPrice: string) {
    if (wallet?.provider) {
      try {
        const provider = new ethers.providers.Web3Provider(wallet.provider);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          OpenFormat.abi,
          signer
        );

        const tx = await toast.promise(
          contract["mint()"]({ value: mintPrice }),
          {
            loading: `confirm transaction in your wallet...`,
            success: "Transaction confirmed",
            error: "Error minting NFT, please try again...",
          },
          { position: "bottom-right" }
        );

        await toast.promise(
          tx.wait(),
          {
            loading: `purchasing NFT...`,
            success: "Photo purchased! 🚀",
            error: "Error minting NFT, please try again...",
          },
          { position: "bottom-right" }
        );

        console.log;
      } catch (e) {
        console.log({ e });
      }
    }
  }

  return (
    <div className="bg-white">
      <div className="mx-auto p-4 sm:px-6 lg:px-8">
        <Header />
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Photos from NFT:BRS
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {data.tokens.map((token) => (
            <PhotoItem token={token} />
          ))}
        </div>
      </div>
    </div>
  );
}
