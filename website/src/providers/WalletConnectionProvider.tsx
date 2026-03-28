import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
} from "@solana/wallet-adapter-wallets";import { clusterApiUrl } from "@solana/web3.js";

const wallets = [new PhantomWalletAdapter()];

const WalletConnectionProvider = ({ children }: { children: React.ReactNode }) => (
  <ConnectionProvider endpoint={clusterApiUrl("devnet")}>
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>{children}</WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
);

export default WalletConnectionProvider;