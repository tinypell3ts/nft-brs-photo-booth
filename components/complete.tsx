import Button from "./button";
import PageHeader from "./page-header";

interface Props {
  image: File;
  onReset: () => void;
}

function Complete({ image, onReset }: Props) {
  return (
    <div className="mb-20 p-6">
      <PageHeader title="Minted!" />

      <div className="mb-4 flex justify-center">
        {image && (
          <img
            className="h-96 w-96 rounded-md object-contain"
            src={URL.createObjectURL(image)}
          />
        )}
      </div>

      <div className="flex flex-col justify-center text-center">
        <p>Head to the Open Format playroom to see your NFT photo.</p>
        <div className="mt-4 flex justify-center">
          <Button onClick={onReset}>Create New NFT</Button>
        </div>
      </div>
    </div>
  );
}

export default Complete;
