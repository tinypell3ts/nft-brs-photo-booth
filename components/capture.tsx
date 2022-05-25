import { ReleaseForm } from "../forms";

interface Props {}

function Capture({ createRelease, image, setImage }) {
  return (
    <div>
      <div className="grid gap-x-5 p-5 md:grid-cols-2">
        <div>
          <h1 className="text-2xl font-bold">Create Photo NFT</h1>
          <ReleaseForm
            onSubmit={(data) => createRelease(data)}
            image={image}
            setImage={setImage}
          />
        </div>
      </div>
    </div>
  );
}

export default Capture;
