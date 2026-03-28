import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Wallet, BarChart3, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

const holdings = [
  { poolKey: "pool.name.apple", tokens: "15,000 GY-APPLES", value: "$1,500", yield: "$62.50", type: "perpetual" as const, claimable: "$62.50" },
  { poolKey: "pool.name.timber", tokens: "30,000 GY-TIMBER", value: "$3,000", yield: "$97.50", type: "perpetual" as const, claimable: "$97.50" },
  { poolKey: "pool.name.wheat", tokens: "10,000 GY-WHEAT", value: "$1,000", yield: "—", type: "epoch" as const, claimable: "—" },
];

const transactions = [
  { date: "2026-03-15", actionKey: "dash.invested", poolKey: "pool.name.apple", amount: "$1,500", status: "confirmed" },
  { date: "2026-03-10", actionKey: "dash.claimed", poolKey: "pool.name.timber", amount: "$45.00", status: "confirmed" },
  { date: "2026-03-01", actionKey: "dash.invested", poolKey: "pool.name.wheat", amount: "$1,000", status: "confirmed" },
  { date: "2026-02-25", actionKey: "dash.invested", poolKey: "pool.name.timber", amount: "$3,000", status: "confirmed" },
  { date: "2026-02-20", actionKey: "dash.claimed", poolKey: "pool.name.apple", amount: "$32.00", status: "confirmed" },
];

const Dashboard = () => {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container pt-24 pb-20">
        <h1 className="text-3xl md:text-4xl font-serif mb-8">{t("dash.title")}</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Wallet, labelKey: "dash.totalInvested" as const, value: "$5,500" },
            { icon: TrendingUp, labelKey: "dash.yieldEarned" as const, value: "$160.00" },
            { icon: BarChart3, labelKey: "dash.activePools" as const, value: "3" },
            { icon: Clock, labelKey: "dash.claimableNow" as const, value: "$160.00" },
          ].map((card) => (
            <div key={card.labelKey} className="p-5 rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <card.icon className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{t(card.labelKey)}</span>
              </div>
              <div className="text-2xl font-serif">{card.value}</div>
            </div>
          ))}
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-serif mb-4">{t("dash.claimableRewards")}</h2>
          <div className="rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 shadow-lg shadow-primary/5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-3xl font-serif text-primary">$160.00</div>
                <p className="text-sm text-muted-foreground mt-1">{t("dash.fromPools")}</p>
              </div>
              <Button size="lg">{t("dash.claimAll")}</Button>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-serif mb-4">{t("dash.tokenHoldings")}</h2>
          <div className="rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50 bg-muted/30">
                    <th className="text-left p-4 font-medium text-muted-foreground">{t("dash.pool")}</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">{t("dash.tokens")}</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">{t("dash.value")}</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">{t("dash.yield")}</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">{t("detail.type")}</th>
                    <th className="text-right p-4 font-medium text-muted-foreground">{t("dash.action")}</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((h, i) => (
                    <tr key={i} className="border-b border-border/30 last:border-0">
                      <td className="p-4 font-medium">{t(h.poolKey as any)}</td>
                      <td className="p-4 text-muted-foreground">{h.tokens}</td>
                      <td className="p-4">{h.value}</td>
                      <td className="p-4 text-primary">{h.yield}</td>
                      <td className="p-4"><Badge variant="secondary" className="text-xs">{h.type === "perpetual" ? t("pool.perpetual") : t("pool.epoch")}</Badge></td>
                      <td className="p-4 text-right">
                        {h.type === "perpetual" ? (
                          <Button size="sm" variant="outline">{t("dash.claimAmount")} {h.claimable}</Button>
                        ) : (
                          <Button size="sm" variant="outline" disabled>{t("dash.awaitingHarvest")}</Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif mb-4">{t("dash.txHistory")}</h2>
          <div className="rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50 bg-muted/30">
                    <th className="text-left p-4 font-medium text-muted-foreground">{t("dash.date")}</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">{t("dash.txAction")}</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">{t("dash.txPool")}</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">{t("dash.txAmount")}</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">{t("dash.txStatus")}</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, i) => (
                    <tr key={i} className="border-b border-border/30 last:border-0">
                      <td className="p-4 text-muted-foreground">{tx.date}</td>
                      <td className="p-4 font-medium">{t(tx.actionKey as any)}</td>
                      <td className="p-4">{t(tx.poolKey as any)}</td>
                      <td className="p-4">{tx.amount}</td>
                      <td className="p-4"><Badge variant="secondary" className="text-xs">{t("dash.confirmed")}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link to="/pools">{t("dash.exploreMore")} <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
