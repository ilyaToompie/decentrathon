import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, Clock, Loader2 } from "lucide-react";
import type { Pool } from "@/lib/pools-data";
import { useI18n } from "@/lib/i18n";

const riskColors: Record<string, string> = {
  low: "bg-primary/10 text-primary",
  medium: "bg-harvest/10 text-harvest-foreground",
  high: "bg-destructive/10 text-destructive",
};

const statusIcons: Record<string, React.ReactNode> = {
  verified: <CheckCircle2 className="h-3.5 w-3.5 text-primary" />,
  "in-progress": <Loader2 className="h-3.5 w-3.5 text-harvest animate-spin" />,
  pending: <Clock className="h-3.5 w-3.5 text-muted-foreground" />,
};

const PoolCard = ({ pool }: { pool: Pool }) => {
  const { t, locale } = useI18n();

  const statusKey = pool.verificationStatus === "verified" ? "pool.verified" :
    pool.verificationStatus === "in-progress" ? "pool.inProgress" : "pool.pending";

  const riskKey = pool.riskLevel === "low" ? "pool.low" :
    pool.riskLevel === "medium" ? "pool.medium" : "pool.high";

  return (
    <Link
      to={`/pools/${pool.id}`}
      className="group block rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={pool.image}
          alt={t(pool.nameKey as any)}
          loading="lazy"
          width={800}
          height={600}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="secondary" className="text-xs font-medium backdrop-blur-md bg-card/70 border border-border/30">
            {pool.poolType === "perpetual" ? t("pool.perpetual") : t("pool.epoch")}
          </Badge>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-serif text-lg leading-tight">{t(pool.nameKey as any)}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{pool.location[locale]}</p>
          </div>
          <span className="text-lg font-semibold text-primary">{pool.expectedYield}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{pool.description[locale]}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {statusIcons[pool.verificationStatus]}
              <span className="text-xs">{t(statusKey as any)}</span>
            </div>
            <Badge variant="outline" className={`text-xs ${riskColors[pool.riskLevel]}`}>
              {t(riskKey as any)} {t("pool.risk")}
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground">TVL {pool.tvl}</div>
        </div>
        {pool.season && (
          <div className="mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
            {t("pool.season")}: {pool.season}
          </div>
        )}
        <div className="mt-3 flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          {t("pool.viewPool")} <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
};

export default PoolCard;
