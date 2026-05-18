"use client";

import { useState, useEffect } from "react";
import UnboundWallet from "./components/UnboundWallet";
import BoundWallet from "./components/BoundWallet";
import { useWallet } from "./hooks/useWallet";

export default function CreateWalletPage() {
  const { hasWallet } = useWallet();

  return hasWallet ? <BoundWallet /> : <UnboundWallet />;
}