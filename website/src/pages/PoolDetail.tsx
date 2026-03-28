import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProofOfHarvestTimeline from "@/components/ProofOfHarvestTimeline";
import { pools } from "@/lib/pools-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, MapPin, TrendingUp, Shield, Coins } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n";

const PoolDetail = () => {
  const { id } = useParams();
  const pool = pools.find((p) => p.id === id);
  const [investOpen, setInvestOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const { t, locale } = useI18n();

  if (!pool) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-24 text-center">
          <h1 className="text-2xl font-serif">{t("detail.notFound")}</h1>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/pools"><ArrowLeft className="mr-2 h-4 w-4" /> {t("detail.backToPools")}</Link>
          </Button>
        </div>
      </div>
    );
  }

  const poolName = t(pool.nameKey as any);
  const tokensReceived = amount ? (parseFloat(amount) * 100).toFixed(0) : "0";
  const ownershipPct = amount ? (parseFloat(amount) / (parseFloat(pool.tvl.replace(/[$,KM]/g, "")) * (pool.tvl.includes("M") ? 1000000 : pool.tvl.includes("K") ? 1000 : 1) + parseFloat(amount || "0")) * 100).toFixed(4) : "0";

  const riskKey = pool.riskLevel === "low" ? "pool.low" : pool.riskLevel === "medium" ? "pool.medium" : "pool.high";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container pt-24 pb-20">
        <Link to="/pools" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="mr-1 h-4 w-4" /> {t("detail.backToPools")}
        </Link>

        <div className="relative rounded-xl overflow-hidden h-64 md:h-80 mb-8">
          <img src={pool.image} alt={poolName} className="w-full h-full object-cover" width={800} height={600} />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-foreground/20" />
          <div className="absolute bottom-6 left-6">
            <Badge variant="secondary" className="mb-2 backdrop-blur-md bg-card/70 border border-border/30">{pool.poolType === "perpetual" ? t("pool.perpetual") : t("pool.epoch")}</Badge>
            <h1 className="text-3xl font-serif text-primary-foreground">{poolName}</h1>
            <div className="flex items-center gap-1 text-primary-foreground/80 text-sm mt-1">
              <MapPin className="h-3.5 w-3.5" /> {pool.location[locale]}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-serif mb-3">{t("detail.overview")}</h2>
              <p className="text-muted-foreground">{pool.description[locale]}</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-3">{t("detail.financialModel")}</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{t("detail.expectedYield")}</div>
                  <div className="text-2xl font-serif text-primary mt-1">{pool.expectedYield}</div>
                </div>
                <div className="p-4 rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{t("detail.tvl")}</div>
                  <div className="text-2xl font-serif mt-1">{pool.tvl}</div>
                </div>
                <div className="p-4 rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{t("detail.riskLevel")}</div>
                  <div className="text-2xl font-serif mt-1">{t(riskKey as any)}</div>
                </div>
              </div>
              <div className="mt-4 p-4 rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm">
                <h3 className="font-sans font-semibold text-sm mb-2">{t("detail.revenueBreakdown")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("detail.revenueFormula")}{" "}
                  {pool.poolType === "perpetual" ? t("detail.revenueDesc.perpetual") : t("detail.revenueDesc.epoch")}
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-3">{t("detail.pohVerification")}</h2>
              <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6">
                <ProofOfHarvestTimeline />
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-3">{t("detail.tokenMechanics")}</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm text-center">
                  <Coins className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-sm font-semibold">{t("detail.mint")}</div>
                  <p className="text-xs text-muted-foreground mt-1">{t("detail.mintDesc")}</p>
                </div>
                <div className="p-4 rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm text-center">
                  <TrendingUp className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-sm font-semibold">{pool.poolType === "perpetual" ? t("detail.claim") : t("detail.redeem")}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {pool.poolType === "perpetual" ? t("detail.claimDesc") : t("detail.redeemDesc")}
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm text-center">
                  <Shield className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-sm font-semibold">{pool.poolType === "perpetual" ? t("detail.hold") : t("detail.burn")}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {pool.poolType === "perpetual" ? t("detail.holdDesc") : t("detail.burnDesc")}
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div>
            <div className="sticky top-24 space-y-4">
              <div className="p-6 rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm shadow-lg shadow-primary/5">
                <h3 className="font-serif text-xl mb-4">{t("detail.investTitle")}</h3>
                <div className="space-y-3 text-sm text-muted-foreground mb-4">
                  <div className="flex justify-between"><span>{t("detail.asset")}</span><span className="text-foreground font-medium">{pool.asset}</span></div>
                  <div className="flex justify-between"><span>{t("detail.type")}</span><span className="text-foreground font-medium">{pool.poolType === "perpetual" ? t("pool.perpetual") : t("pool.epoch")}</span></div>
                  <div className="flex justify-between"><span>{t("detail.expectedYield")}</span><span className="text-primary font-medium">{pool.expectedYield}</span></div>
                  <div className="flex justify-between"><span>{t("detail.verification")}</span><span className="text-foreground font-medium">{t(pool.verificationStatus === "verified" ? "pool.verified" : pool.verificationStatus === "in-progress" ? "pool.inProgress" : "pool.pending" as any)}</span></div>
                  {pool.season && <div className="flex justify-between"><span>{t("pool.season")}</span><span className="text-foreground font-medium">{pool.season}</span></div>}
                </div>
                <Button className="w-full" size="lg" onClick={() => setInvestOpen(true)}>
                  {t("detail.investNow")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={investOpen} onOpenChange={setInvestOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">{t("detail.investIn")} {poolName}</DialogTitle>
            <DialogDescription>{t("detail.investModalDesc")}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <label className="text-sm font-medium">{t("detail.amount")}</label>
              <Input
                type="number"
                placeholder="1000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="p-4 rounded-xl bg-muted/50 backdrop-blur-sm space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">{t("detail.tokensReceived")}</span><span className="font-medium">{tokensReceived} GY-{pool.asset.toUpperCase()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">{t("detail.ownershipShare")}</span><span className="font-medium">{ownershipPct}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">{t("detail.expectedYield")}</span><span className="text-primary font-medium">{pool.expectedYield}</span></div>
            </div>
            <Button className="w-full" size="lg" disabled={!amount || parseFloat(amount) <= 0}>
              {t("detail.confirmTx")}
            </Button>
            <p className="text-xs text-muted-foreground text-center">{t("detail.demoNotice")}</p>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default PoolDetail;
