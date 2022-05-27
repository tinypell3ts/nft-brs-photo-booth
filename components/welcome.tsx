import { Transition } from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";
import Button from "./button";

interface Props {
  onClose?: () => void;
}

function Welcome({ onClose }: Props) {
  const [isShowing, setIsShowing] = useState(true);

  function close() {
    setIsShowing(false);
    onClose?.();
  }

  return (
    <Transition
      show={isShowing}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black p-6 text-white">
        <div>
          <div className="mb-12 flex justify-center">
            <Image
              src="/nftbrs-logo.jpg"
              width={226}
              height={137}
              alt="NFT BRS logo"
              className="invert"
            />
          </div>

          <div className="text-center">
            <h1 className="font-display text-3xl font-bold text-zinc-200">
              NFT
              <br />
              Photobooth
            </h1>
            <p className="font-mono text-zinc-300">
              Get yourself minted as an NFT to appear in the live gallery!
            </p>

            <div className="mt-6 flex justify-center">
              <Button onClick={close}>Continue</Button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}

export default Welcome;
