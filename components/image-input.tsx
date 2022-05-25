import { forwardRef, useRef, useState } from "react";
import Webcam from "react-webcam";
import Button from "./button";

interface Props {}

const ImageInput = forwardRef<HTMLInputElement, Props>(
  ({ name, setValue, trigger }, _) => {
    const cameraRef = useRef<Webcam>(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    async function capture() {
      try {
        const imageString = cameraRef.current?.getScreenshot();

        if (typeof imageString !== "string") {
          throw new Error("Couldn't capture from camera");
        }

        const res = await fetch(imageString);
        const blob = await res.blob();
        const image = new File([blob], "webcam.png", { type: "image/png" });
        setValue(name, image);
        trigger(name);
      } catch {
        alert("Couldn't capture your photo");
      }
    }

    return (
      <div className="fixed inset-0 z-50 bg-zinc-900">
        <div className="h-full">
          <Webcam
            ref={cameraRef}
            mirrored={true}
            screenshotFormat="image/png"
            onUserMedia={() => setIsLoading(false)}
            onUserMediaError={() => setIsError(true)}
            videoConstraints={{
              width: window.innerWidth,
              height: window.innerHeight,
            }}
            className="h-full w-full object-cover"
          />

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
              Loading...
            </div>
          )}

          <div className="absolute bottom-0 left-0">
            <div className="flex">
              <Button type="button" onClick={capture}>
                Capture
              </Button>
              <input
                accept=".png,.jpg,.jpeg"
                type="file"
                name={name}
                onChange={(event) => {
                  const image = event.target.files?.[0];
                  if (image) {
                    setValue(name, image);
                    trigger(name);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ImageInput.displayName = "ImageInput";

export default ImageInput;
