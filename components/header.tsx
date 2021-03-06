import { ExternalLinkIcon } from "@heroicons/react/outline";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { ethers } from "ethers";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { Button } from "../components";
import { BLOCK_EXPLORER_URL, switchChain } from "../helpers";

export default function Header() {
  const { t } = useTranslation("common");
  const [{ wallet }, connect, disconnect] = useConnectWallet();
  const [{}, setChain] = useSetChain();
  const CHAIN_ID = ethers.utils.hexValue(
    parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)
  );

  async function handleConnect() {
    await connect({});
  }

  useEffect(() => {
    if (wallet && CHAIN_ID) {
      switchChain(setChain, CHAIN_ID);
    }
  }, [wallet]);

  async function handleDisconnect() {
    if (wallet) {
      await disconnect(wallet);
    }
  }

  const [backgroundClass, setBackgroundClass] = useState("opacity-0");
  useEffect(() => {
    function listener() {
      if (window.scrollY >= 50) {
        setBackgroundClass("opacity-70");
      } else {
        setBackgroundClass("opacity-0");
      }
    }

    document.addEventListener("scroll", listener);

    return () => document.removeEventListener("scroll", listener);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full p-4">
      <div className="relative z-10 flex items-center justify-end">
        {wallet?.accounts[0].address ? (
          <>
            <a
              target="_blank"
              rel="noreferrer"
              href={BLOCK_EXPLORER_URL(wallet?.accounts[0]?.address)}
            >
              <div className="mx-2 flex hover:text-indigo-800">
                <span>
                  {wallet?.accounts[0]?.address.slice(0, 4)}...
                  {wallet?.accounts[0]?.address.slice(-4)}
                </span>
                <ExternalLinkIcon className="h-6 w-6" />
              </div>
            </a>
            <Button onClick={handleDisconnect}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </Button>
          </>
        ) : (
          <Button onClick={handleConnect}>{t("wallet.connect_button")}</Button>
        )}
      </div>
      <div
        className={`absolute inset-0 bg-black transition-opacity ${backgroundClass}`}
      />
    </header>
  );
}
