import { Dispatch, SetStateAction } from "react";
import { SubmitHandler } from "react-hook-form";
import { ReleaseForm } from "../forms";
import { Inputs } from "../forms/releaseForm";

interface Props {
  createRelease: SubmitHandler<Inputs>;
  image: File | null | undefined;
  setImage: Dispatch<SetStateAction<File | null | undefined>>;
}

function Capture({ createRelease, image, setImage }: Props) {
  return (
    <>
      <ReleaseForm
        onSubmit={(data) => createRelease(data)}
        image={image}
        setImage={setImage}
      />
    </>
  );
}

export default Capture;
