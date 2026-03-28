import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TrustWalletAdapter,
  HuobiWalletAdapter,
  WalletConnectWalletAdapter,
  CoinbaseWalletAdapter

} from "@solana/wallet-adapter-wallets";import { clusterApiUrl } from "@solana/web3.js";

const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
  new TrustWalletAdapter(),
  new HuobiWalletAdapter(),
  new CoinbaseWalletAdapter()
];

const WalletConnectionProvider = ({ children }: { children: React.ReactNode }) => (
  <ConnectionProvider endpoint={clusterApiUrl("devnet")}>
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>{children}</WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
);

export default WalletConnectionProvider;