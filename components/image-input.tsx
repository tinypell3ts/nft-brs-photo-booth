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
      <div className="fixed inset-0 z-50 bg-black">
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

          {(isLoading || isError) && (
            <div className="absolute inset-0 flex items-center justify-center bg-black p-4 text-center font-mono font-bold text-white">
              {isError
                ? "Couldn't access your camera"
                : isLoading && "Waiting for your camera..."}
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4">
            <div className="flex flex-col items-center space-y-4">
              {!isError && (
                <Button type="button" onClick={capture}>
                  Capture
                </Button>
              )}

              <div>
                <input
                  accept=".png,.jpg,.jpeg"
                  type="file"
                  name={name}
                  className="block w-full text-xs text-zinc-500 file:mr-4 file:rounded-full file:border-0 file:bg-black file:py-2 file:px-4 file:text-sm file:font-semibold file:text-zinc-500 hover:file:bg-black"
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
      </div>
    );
  }
);

ImageInput.displayName = "ImageInput";

export default ImageInput;
