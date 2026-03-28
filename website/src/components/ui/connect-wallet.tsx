import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import solanaSvg from "cryptocurrency-icons/svg/color/sol.svg"; // default icon

export default function ConnectWallet() {
  const { connected, connect, disconnect, publicKey, select, wallets } = useWallet();
  const [justConnected, setJustConnected] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [walletMenuOpen, setWalletMenuOpen] = useState(false);
  const [toast, setToast] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Toast timer
  const showToast = (message: string, duration = 2000) => {
    setToast(message);
    setTimeout(() => setToast(""), duration);
  };

  useEffect(() => {
    if (connected) {
      setJustConnected(true);
      showToast("Wallet connected!");
      const timer = setTimeout(() => setJustConnected(false), 250);
      return () => clearTimeout(timer);
    }
  }, [connected]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
        setWalletMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleConnectClick = () => {
    if (!connected) {
      setWalletMenuOpen((prev) => !prev);
    } else {
      setMenuOpen((prev) => !prev);
    }
  };

  const handleWalletSelect = async (walletName: string) => {
    select(walletName as any);
    try {
      await connect();
      setWalletMenuOpen(false);
      setMenuOpen(true);
      showToast(`${walletName} connected!`);
    } catch (err) {
      console.error("Wallet connection failed", err);
      showToast(`Failed to connect ${walletName}`);
    }
  };

  const formatAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-6)}`;

  const handleCopyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toBase58());
      showToast("Address copied!");
    }
    setMenuOpen(false);
  };

  const handleDashboard = () => {
    navigate("/dashboard");
    setMenuOpen(false);
  };

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        onClick={handleConnectClick}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg font-semibold
          transition transform duration-500 ease-out
          ${connected ? "bg-primary/80 text-white scale-105" : "bg-gray-600 text-white hover:bg-primary"}
          ${justConnected ? "animate-pulse" : ""}
        `}
      >
        {connected ? (
          <>
            {formatAddress(publicKey?.toBase58() || "")}
            <img
              src={wallets.find(w => w.adapter.connected)?.adapter.icon || solanaSvg}
              alt="Wallet"
              width={24}
              height={24}
            />
          </>
        ) : (
          <>
            Connect Wallet
            <img src={solanaSvg} alt="Solana" width={24} height={24} />
          </>
        )}
      </button>

      {/* Wallet selection menu */}
      {!connected && walletMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
          {wallets.map((w) => (
            <button
              key={w.adapter.name}
              onClick={() => handleWalletSelect(w.adapter.name)}
              className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              <img
                src={w.adapter.icon || solanaSvg}
                alt={w.adapter.name}
                width={20}
                height={20}
              />
              {w.adapter.name}
            </button>
          ))}
        </div>
      )}

      {/* Connected menu */}
      {connected && menuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
          <button
            onClick={handleDashboard}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Dashboard
          </button>
          <button
            onClick={() => setWalletMenuOpen(true)}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Change Wallet
          </button>
          <button
            onClick={disconnect}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Disconnect
          </button>
          <button
            onClick={handleCopyAddress}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Copy Address
          </button>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 right-5 bg-black text-white px-4 py-2 rounded-lg shadow-md z-50">
          {toast}
        </div>
      )}
    </div>
  );
}