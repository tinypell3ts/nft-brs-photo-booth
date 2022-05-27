import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../components";
import ImageInput from "../components/image-input";
import PageHeader from "../components/page-header";

interface ReleaseFormProps {
  onSubmit: SubmitHandler<Inputs>;
  setImage: (image: File) => void;
  image: File | null | undefined;
  isLoading: boolean;
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
  isLoading,
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
      placeholder: "0.01",
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
          <PageHeader title="Mint your photo" />

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

          <div className="mt-8 mb-12 flex flex-col items-center justify-center">
            <p className="mb-4 text-center text-sm text-zinc-400">
              👋 By creating an NFT you are agreeing to immutably upload your
              photo to IPFS
            </p>
            <Button isLoading={isLoading} type="submit">
              Create NFT
            </Button>
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
