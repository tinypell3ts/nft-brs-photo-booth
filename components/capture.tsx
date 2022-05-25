import { Dispatch, SetStateAction } from "react";
import { ReleaseForm } from "../forms";

interface Props {
  createRelease: (data: Data) => Promise<void>;
  image: File | null | undefined;
  setImage: Dispatch<SetStateAction<File | null | undefined>>;
  isLoading: boolean;
}

function Capture({ createRelease, image, setImage, isLoading }: Props) {
  return (
    <div className="p-6">
      <ReleaseForm
        onSubmit={(data) => createRelease(data)}
        image={image}
        setImage={setImage}
        isLoading={isLoading}
      />
    </div>
  );
}

export default Capture;
