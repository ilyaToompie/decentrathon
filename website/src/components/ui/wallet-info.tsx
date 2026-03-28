import { useWallet } from "@solana/wallet-adapter-react";

function WalletInfo() {
  const { publicKey, connected } = useWallet();

  return (
    <div>
      {connected ? `Connected: ${publicKey?.toBase58()}` : "Not connected"}
    </div>
  );
}

export default WalletInfo;