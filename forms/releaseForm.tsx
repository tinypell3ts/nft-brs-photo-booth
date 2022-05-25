import Image from "next/image";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../components";
import ImageInput from "../components/image-input";

interface ReleaseFormProps {
  onSubmit: SubmitHandler<Inputs>;
  setImage: (image: File) => void;
  image: File | null | undefined;
}

export type Inputs = {
  name: string;
  image: File;
  photographer: string;
};

export default function ReleaseForm({
  onSubmit,
  setImage,
  image,
}: ReleaseFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const watchImage = watch("image");

  useEffect(() => {
    if (watchImage) {
      setImage(watchImage);
    }
  }, [watchImage, setImage]);

  const fields = [
    {
      id: "name",
      label: "Photo name",
      placeholder: "",
      type: "text",
      required: true,
    },
    {
      id: "description",
      label: "Photo Description",
      placeholder: "",
      type: "text",
      required: true,
    },
    {
      id: "mint_price",
      label: "Mint price (in MATIC)",
      placeholder: "",
      type: "number",
      step: "0.001",
      required: true,
    },
    {
      id: "photographer_name",
      label: "Photographer name",
      placeholder: "",
      type: "text",
    },
    {
      id: "photographer_wallet",
      label: "Add wallet address (optional)",
      type: "text",
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {image ? (
        <div className="mx-auto max-w-xl">
          <div className="mb-12 flex justify-center">
            <Image
              src="/nftbrs-logo.jpg"
              width={113}
              height={68}
              alt="NFT BRS logo"
              className="invert"
            />
          </div>
          <h1 className="mb-4 text-center font-display text-3xl font-bold text-zinc-200">
            Mint your photo
          </h1>

          <div className="space-y-4">
            {fields.map((field, i) => (
              <div className="flex flex-col" key={i}>
                <label className="mb-2 block font-mono text-zinc-400">
                  {field.label}
                </label>
                <input
                  className="bg-zinc-800 py-2 px-4 font-mono text-zinc-400"
                  accept={field.accept}
                  type={field.type}
                  placeholder={field.placeholder}
                  step={field.step}
                  {...register(field.id, { required: field.required })}
                />
                {errors[field.id] && (
                  <span className="mt-2 block font-mono font-semibold text-red-500">
                    {field.id} is required
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 mb-12 flex justify-center">
            <Button type="submit">Create NFT</Button>
          </div>
        </div>
      ) : (
        <>
          <ImageInput
            {...register("image", { required: true })}
            setValue={setValue}
            trigger={trigger}
          />
        </>
      )}
    </form>
  );
}
