import { useConnectWallet } from "@web3-onboard/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../components";

interface ReleaseFormProps {
  onSubmit: SubmitHandler<Inputs>;
}

type Inputs = {
  track_name: string;
  track_description: string;
  track_identifier: string;
  track_artwork: string;
  track_audio: File;
};

export default function ReleaseForm({ onSubmit }: ReleaseFormProps) {
  const [{ wallet }] = useConnectWallet();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const fields = [
    {
      id: "track_name",
      label: "Track Name",
      placeholder: "Track",
      type: "text",
    },
    {
      id: "track_description",
      label: "Track Description",
      placeholder: "My new release",
      type: "text",
    },
    {
      id: "track_identifier",
      label: "Track Identifier",
      placeholder: "TRACK",
      type: "text",
    },
    {
      id: "track_artwork",
      label: "Upload track artwork",
      type: "file",
      accept: ".png,.jpg,.jpeg",
    },
    {
      id: "track_audio",
      label: "Upload track audio",
      type: "file",
      accept: ".mp3",
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-2">
        {fields.map((field, i) => (
          <div className="flex flex-col" key={i}>
            <label>{field.label}</label>
            <input
              className={field.type === "text" ? "border-2" : undefined}
              accept={field.accept}
              type={field.type}
              placeholder={field.placeholder}
              {...register(field.id, { required: true })}
            />
            {errors[field.id] && <span>{field.id} is required</span>}
          </div>
        ))}

        <div className="mx-auto">
          {/* Here we are checking if a wallet is connect and preventing the user 
          from minting if not. */}

          {wallet?.provider ? (
            <Button>Create release</Button>
          ) : (
            <p>Please connect your wallet to create an NFT.</p>
          )}
        </div>
      </div>
    </form>
  );
}
