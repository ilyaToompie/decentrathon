import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

const Footer = () => {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-5 w-5 text-primary" />
              <span className="font-serif text-lg">GreenYield</span>
            </div>
            <p className="text-sm text-muted-foreground">{t("footer.desc")}</p>
          </div>
          <div>
            <h4 className="font-sans text-sm font-semibold mb-3">{t("footer.platform")}</h4>
            <div className="space-y-2">
              <Link to="/pools" className="block text-sm text-muted-foreground hover:text-primary">{t("nav.explorePools")}</Link>
              <Link to="/dashboard" className="block text-sm text-muted-foreground hover:text-primary">{t("nav.dashboard")}</Link>
              <Link to="/transparency" className="block text-sm text-muted-foreground hover:text-primary">{t("nav.transparency")}</Link>
            </div>
          </div>
          <div>
            <h4 className="font-sans text-sm font-semibold mb-3">{t("footer.resources")}</h4>
            <div className="space-y-2">
              <span className="block text-sm text-muted-foreground">{t("footer.docs")}</span>
              <span className="block text-sm text-muted-foreground">{t("footer.whitepaper")}</span>
              <span className="block text-sm text-muted-foreground">{t("footer.audits")}</span>
            </div>
          </div>
          <div>
            <h4 className="font-sans text-sm font-semibold mb-3">{t("footer.legal")}</h4>
            <div className="space-y-2">
              <span className="block text-sm text-muted-foreground">{t("footer.terms")}</span>
              <span className="block text-sm text-muted-foreground">{t("footer.privacy")}</span>
              <span className="block text-sm text-muted-foreground">{t("footer.risk")}</span>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/50 text-center text-xs text-muted-foreground">
          {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
