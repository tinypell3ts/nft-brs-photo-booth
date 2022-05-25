import { Dispatch, SetStateAction } from "react";
import { ReleaseForm } from "../forms";

interface Props {
  createRelease: (data: Data) => Promise<void>;
  image: File | null | undefined;
  setImage: Dispatch<SetStateAction<File | null | undefined>>;
}

function Capture({ createRelease, image, setImage }: Props) {
  return (
    <div className="p-6">
      <ReleaseForm
        onSubmit={(data) => createRelease(data)}
        image={image}
        setImage={setImage}
      />
    </div>
  );
}

export default Capture;
