import type {
  ConnectOptions,
  SetChainOptions,
  WalletState,
} from "@web3-onboard/core";
import { ethers } from "ethers";

async function readyToTransact(
  wallet: WalletState,
  connect: (options: ConnectOptions) => Promise<void>,
  setChain: (options: SetChainOptions) => Promise<void>
) {
  const CHAIN_ID = ethers.utils.hexValue(
    parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)
  );
  if (!wallet) {
    const walletSelected = await connect({});
    if (!Boolean(walletSelected)) return false;
  }
  if (CHAIN_ID) {
    await setChain({ chainId: CHAIN_ID });
  }

  return true;
}

async function switchChain(
  setChain: (options: SetChainOptions) => Promise<void>,
  chainId: string
) {
  await setChain({ chainId });
}

export { readyToTransact, switchChain };
