import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../components";
import ImageInput from "../components/image-input";

interface ReleaseFormProps {
  onSubmit: SubmitHandler<Inputs>;
  setImage: (image: File) => void;
  image?: File;
}

type Inputs = {
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
        <>
          <div className="mx-auto flex max-w-2xl flex-col space-y-2">
            {fields.map((field, i) => (
              <div className="flex flex-col" key={i}>
                <label>{field.label}</label>
                <input
                  className={field.type === "file" ? undefined : "border-2"}
                  accept={field.accept}
                  type={field.type}
                  placeholder={field.placeholder}
                  step={field.step}
                  {...register(field.id, { required: field.required })}
                />
                {errors[field.id] && (
                  <span className="font-semibold text-red-500">
                    {field.id} is required
                  </span>
                )}
              </div>
            ))}

            <div className="mx-auto">
              <Button>Create NFT</Button>
            </div>
          </div>
        </>
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
