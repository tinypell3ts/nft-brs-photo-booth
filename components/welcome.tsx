import { Transition } from "@headlessui/react";
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
          Welcome
          <Button onClick={close}>Continue</Button>
        </div>
      </div>
    </Transition>
  );
}

export default Welcome;
