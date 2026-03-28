import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/lib/i18n";
import Index from "./pages/Index.tsx";
import ExplorePools from "./pages/ExplorePools.tsx";
import PoolDetail from "./pages/PoolDetail.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Transparency from "./pages/Transparency.tsx";
import NotFound from "./pages/NotFound.tsx";
import ConnectWallet from "./components/ui/connect-wallet.tsx";
import WalletInfo from "./components/ui/wallet-info.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.PROD ? '/decentrathon' : '/'}>
        <ConnectWallet />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pools" element={<ExplorePools />} />
          <Route path="/pools/:id" element={<PoolDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transparency" element={<Transparency />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
