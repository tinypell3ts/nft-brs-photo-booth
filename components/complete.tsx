import Button from "./button";
import PageHeader from "./page-header";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";

interface Props {
  image: File;
  onReset: () => void;
}

function Complete({ image, onReset }: Props) {
  const { width, height } = useWindowSize();
  console.log({ width, height });

  return (
    <div className="mb-20 p-6">
      <PageHeader title="Minted!" />

      <div className="mb-4 flex justify-center">
        {image && (
          <img
            className="h-96 w-96 rounded-md object-contain"
            src={URL.createObjectURL(image)}
          />
        )}
      </div>

      <div className="flex flex-col justify-center text-center">
        <p>Head to the Open Format playroom to see your NFT photo.</p>
        <div className="mt-4 flex justify-center">
          <Button onClick={onReset}>Create New NFT</Button>
        </div>
      </div>
      <Confetti width={width ?? 0} height={height ?? 0} />
    </div>
  );
}

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export default Complete;
