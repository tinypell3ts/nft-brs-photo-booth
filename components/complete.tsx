import { TRANSACTION_URL } from "../helpers";
import Button from "./button";
import PageHeader from "./page-header";

interface Props {
  image: File;

  onReset: () => void;
}

function Complete({ image, onReset }: Props) {
  return (
    <div>
      <PageHeader title="Minted!" />

      {image && <img className="w-96" src={URL.createObjectURL(image)} />}

      <p>Head to the Open Format playroom to see your NFT photo.</p>

      <Button onClick={onReset}>Create New NFT</Button>
    </div>
  );
}

export default Complete;
