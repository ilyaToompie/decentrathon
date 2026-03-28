import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Eye, Droplets, CheckCircle2 } from "lucide-react";
import heroImg from "@/assets/hero-farm.jpg";
import harvestImg from "@/assets/harvest.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatsBar from "@/components/StatsBar";
import ProofOfHarvestTimeline from "@/components/ProofOfHarvestTimeline";
import PoolCard from "@/components/PoolCard";
import { pools } from "@/lib/pools-data";
import { useI18n } from "@/lib/i18n";

const benefitIcons = [Eye, Shield, Droplets, CheckCircle2];
const benefitKeys = [
  { title: "benefits.transparent.title", desc: "benefits.transparent.desc" },
  { title: "benefits.trustMinimized.title", desc: "benefits.trustMinimized.desc" },
  { title: "benefits.liquid.title", desc: "benefits.liquid.desc" },
  { title: "benefits.verified.title", desc: "benefits.verified.desc" },
] as const;

const Index = () => {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Agricultural farmland" width={1920} height={1080} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/50" />
          {/* Web3 grid overlay */}
          <div className="absolute inset-0 opacity-[.01]" style={{ backgroundImage: "linear-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary-foreground)) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>
        <div className="relative container py-28 md:py-40">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm text-xs font-medium text-primary-foreground/80 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/100 animate-pulse" />
              Web3 · DeFi · RWA
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary-foreground leading-tight">
              {t("hero.title1")} <br />{t("hero.title2")}
            </h1>
            <p className="mt-5 text-lg text-primary-foreground/80 max-w-lg">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/pools">{t("hero.explorePools")} <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary-foreground/30 text-primary hover:bg-primary-foreground/10 backdrop-blur-sm hover:text-primary-foreground/80">
                <Link to="/transparency">{t("hero.howItWorks")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsBar />

      {/* Proof of Harvest */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">{t("poh.label")}</p>
              <h2 className="text-3xl md:text-4xl font-serif leading-tight">{t("poh.title")}</h2>
              <p className="mt-4 text-muted-foreground">{t("poh.desc")}</p>
              <Button asChild variant="outline" className="mt-6">
                <Link to="/transparency">{t("poh.learnMore")}</Link>
              </Button>
            </div>
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-lg shadow-primary/5">
              <ProofOfHarvestTimeline compact />
            </div>
          </div>
        </div>
      </section>

      {/* Pool Models */}
      <section className="py-20 bg-card/50 border-y border-border/50">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">{t("models.label")}</p>
            <h2 className="text-3xl md:text-4xl font-serif">{t("models.title")}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 rounded-xl border border-border/50 bg-background/80 backdrop-blur-sm hover:border-primary/20 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <Droplets className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl mb-2">{t("models.perpetual")}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• {t("models.perpetual.1")}</li>
                <li>• {t("models.perpetual.2")}</li>
                <li>• {t("models.perpetual.3")}</li>
                <li>• {t("models.perpetual.4")}</li>
              </ul>
            </div>
            <div className="p-8 rounded-xl border border-border/50 bg-background/80 backdrop-blur-sm hover:border-harvest/20 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-harvest/10 border border-harvest/20 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-harvest" />
              </div>
              <h3 className="font-serif text-xl mb-2">{t("models.epoch")}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• {t("models.epoch.1")}</li>
                <li>• {t("models.epoch.2")}</li>
                <li>• {t("models.epoch.3")}</li>
                <li>• {t("models.epoch.4")}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pools */}
      <section className="py-20">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">{t("featured.label")}</p>
              <h2 className="text-3xl md:text-4xl font-serif">{t("featured.title")}</h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/pools">{t("featured.viewAll")} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pools.slice(0, 3).map((pool) => (
              <PoolCard key={pool.id} pool={pool} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-card/50 border-y border-border/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif">{t("benefits.title")}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefitKeys.map((b, i) => {
              const Icon = benefitIcons[i];
              return (
                <div key={b.title} className="text-center p-6 rounded-xl border border-transparent hover:border-border/50 hover:bg-card/50 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg mb-2">{t(b.title as any)}</h3>
                  <p className="text-sm text-muted-foreground">{t(b.desc as any)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={harvestImg} alt="Harvest" loading="lazy" width={800} height={600} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary-foreground)) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>
        <div className="relative container text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-primary-foreground">{t("cta.title")}</h2>
          <p className="mt-4 text-primary-foreground/80 max-w-md mx-auto">{t("cta.desc")}</p>
          <Button asChild size="lg" className="mt-6">
            <Link to="/pools">{t("hero.explorePools")} <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
