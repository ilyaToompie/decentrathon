import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PoolCard from "@/components/PoolCard";
import { pools, type PoolType } from "@/lib/pools-data";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

const ExplorePools = () => {
  const [filter, setFilter] = useState<"all" | PoolType>("all");
  const { t } = useI18n();
  const filtered = filter === "all" ? pools : pools.filter((p) => p.poolType === filter);

  const filterLabels = {
    all: t("explore.all"),
    perpetual: t("explore.perpetual"),
    epoch: t("explore.epoch"),
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container pt-24 pb-20">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif">{t("explore.title")}</h1>
          <p className="text-muted-foreground mt-2">{t("explore.subtitle")}</p>
        </div>

        <div className="flex gap-2 mb-8">
          {(["all", "perpetual", "epoch"] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
            >
              {filterLabels[f]}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((pool) => (
            <PoolCard key={pool.id} pool={pool} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExplorePools;
