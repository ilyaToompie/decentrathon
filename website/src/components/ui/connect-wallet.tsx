import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import solanaSvg from "cryptocurrency-icons/svg/color/sol.svg";

export default function ConnectWallet() {
  const { connected, connect, disconnect, publicKey, select, wallets } = useWallet();
  const [justConnected, setJustConnected] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (connected) {
      setJustConnected(true);
      const timer = setTimeout(() => setJustConnected(false), 250);
      return () => clearTimeout(timer);
    }
  }, [connected]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleConnectClick = async () => {
    if (!connected) {
      const phantomWallet = wallets.find((w) => w.adapter.name === "Phantom");
      if (!phantomWallet) {
        console.error("Phantom wallet not found");
        return;
      }
      select(phantomWallet.adapter.name);
      try {
        await connect();
        setMenuOpen(true);
      } catch (err) {
        console.error("Wallet connection failed", err);
      }
    } else {
      setMenuOpen((prev) => !prev);
    }
  };

  const formatAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-6)}`;

  const handleCopyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toBase58());
      setToast("Address copied!");
      setTimeout(() => setToast(""), 2000);
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
        {connected ? formatAddress(publicKey?.toBase58() || "") : (
          <>
            Connect Wallet
            <img src={solanaSvg} alt="Solana" width={24} height={24} />
          </>
        )}
      </button>

      {connected && menuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
          <button
            onClick={handleDashboard}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Dashboard
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

      {toast && (
        <div className="fixed bottom-5 right-5 bg-black text-white px-4 py-2 rounded-lg shadow-md z-50">
          {toast}
        </div>
      )}
    </div>
  );
}