import { platformStats } from "@/lib/pools-data";
import { useI18n } from "@/lib/i18n";

const StatsBar = () => {
  const { t } = useI18n();

  const stats = [
    { label: t("stats.tvl"), value: platformStats.tvl },
    { label: t("stats.activePools"), value: String(platformStats.activePools) },
    { label: t("stats.yieldRange"), value: platformStats.yieldRange },
    { label: t("stats.verifiedHarvests"), value: String(platformStats.verifiedHarvests) },
  ];

  return (
    <section className="border-y border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="container py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-2xl md:text-3xl font-serif text-primary">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
