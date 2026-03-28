import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n, localeLabels, type Locale } from "@/lib/i18n";
import ConnectWallet from "./ui/connect-wallet";

const navLinks = [
  { labelKey: "nav.explorePools" as const, href: "/pools" },
  { labelKey: "nav.dashboard" as const, href: "/dashboard" },
  { labelKey: "nav.transparency" as const, href: "/transparency" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { t, locale, setLocale } = useI18n();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/50">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Leaf className="h-4 w-4 text-primary" />
          </div>
          <span className="font-serif text-xl text-foreground">GreenYield</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
            {(["ru", "kz", "en"] as Locale[]).map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={`px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  locale === l
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {localeLabels[l]}
              </button>
            ))}
          </div> 
            <ConnectWallet/>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/50 bg-background/90 backdrop-blur-xl p-4 space-y-3 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary"
            >
              {t(link.labelKey)}
            </Link>
          ))}
          <div className="flex items-center gap-1 py-2">
            {(["ru", "kz", "en"] as Locale[]).map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  locale === l
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {localeLabels[l]}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="w-full">{t("nav.connectWallet")}</Button>
        </div>
      )}
    </header>
  );
};

export default Navbar;

/*<Button variant="outline" size="sm" className="border-primary/30 backdrop-blur-sm">
            {t("nav.connectWallet")}
          </Button> */