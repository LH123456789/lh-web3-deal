import { useState, useCallback } from "react";
import { ethers } from "ethers";

export interface CreatedWallet {
  mnemonic: string;
  address: string;
  privateKey: string;
  createdAt: number;
}

export function useCreateWallet() {
  const [isCreating, setIsCreating] = useState(false);
  const [createdWallet, setCreatedWallet] = useState<CreatedWallet | null>(null);
  const [canConfirm, setCanConfirm] = useState(false);

  const createWallet = useCallback(async (): Promise<boolean> => {
    try {
      setIsCreating(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      const wallet = ethers.Wallet.createRandom();
      const mnemonic = wallet.mnemonic.phrase;

      const newWallet: CreatedWallet = {
        mnemonic,
        address: wallet.address,
        privateKey: wallet.privateKey,
        createdAt: Date.now(),
      };

      setCreatedWallet(newWallet);
      setIsCreating(false);

      setTimeout(() => {
        setCanConfirm(true);
      }, 5000);

      return true;
    } catch {
      setIsCreating(false);
      return false;
    }
  }, []);

  const reset = useCallback(() => {
    setCreatedWallet(null);
    setCanConfirm(false);
  }, []);

  return {
    isCreating,
    createdWallet,
    canConfirm,
    createWallet,
    reset,
  };
}