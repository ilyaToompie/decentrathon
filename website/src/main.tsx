import { createRoot } from "react-dom/client";
import { I18nProvider } from "@/lib/i18n";
import App from "./App.tsx";
import "./index.css";
import WalletConnectionProvider from "./providers/WalletConnectionProvider.tsx";
import ConnectWallet from "./components/ui/connect-wallet.tsx";
import WalletInfo from "./components/ui/wallet-info.tsx";
import '@solana/wallet-adapter-react-ui/styles.css';
import { Buffer } from "buffer";
import process from "process";

window.Buffer = Buffer;
window.process = process;
createRoot(document.getElementById("root")!).render(
  <WalletConnectionProvider>
    <I18nProvider>
      <App />
    </I18nProvider>
  </WalletConnectionProvider>
);