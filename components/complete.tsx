import { TRANSACTION_URL } from "../helpers";
import Button from "./button";
import PageHeader from "./page-header";

interface Props {
  image: File;
  transactionHash: string;
  onReset: () => void;
}

function Complete({ image, transactionHash, onReset }: Props) {
  return (
    <div>
      <PageHeader title="Minted!" />

      {image && <img className="w-96" src={URL.createObjectURL(image)} />}

      <p>Head to the Open Format playroom to see your NFT photo.</p>

      <a
        href={TRANSACTION_URL(transactionHash)}
        target="_blank"
        rel="noreferrer"
      >
        <Button>View Transaction</Button>
      </a>

      <Button onClick={onReset}>Create New NFT</Button>
    </div>
  );
}

export default Complete;
