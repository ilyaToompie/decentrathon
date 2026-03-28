import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProofOfHarvestTimeline from "@/components/ProofOfHarvestTimeline";
import { Shield, Database, Users, ArrowRight, FileCheck2, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

const Transparency = () => {
  const { t } = useI18n();
  const merkleSteps = t("trans.merkleSteps") as string[];
  const dataFlowSteps = t("trans.dataFlowSteps") as { title: string; desc: string }[];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container pt-24 pb-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif mb-4">{t("trans.title")}</h1>
          <p className="text-muted-foreground text-lg mb-12">{t("trans.subtitle")}</p>

          <section className="mb-16">
            <h2 className="text-2xl font-serif mb-6">{t("trans.pipeline")}</h2>
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-8">
              <ProofOfHarvestTimeline />
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-serif mb-4">{t("trans.multiParty")}</h2>
            <p className="text-muted-foreground mb-6">{t("trans.multiPartyDesc")}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Users, titleKey: "trans.independentParties" as const, descKey: "trans.independentPartiesDesc" as const },
                { icon: FileCheck2, titleKey: "trans.cryptoProof" as const, descKey: "trans.cryptoProofDesc" as const },
                { icon: Database, titleKey: "trans.dataAgg" as const, descKey: "trans.dataAggDesc" as const },
                { icon: Shield, titleKey: "trans.fraudResist" as const, descKey: "trans.fraudResistDesc" as const },
              ].map((item) => (
                <div key={item.titleKey} className="p-5 rounded-xl border border-border/50 bg-background/80 backdrop-blur-sm hover:border-primary/20 transition-colors">
                  <item.icon className="h-5 w-5 text-primary mb-3" />
                  <h3 className="font-sans font-semibold text-sm mb-1">{t(item.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground">{t(item.descKey)}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-serif mb-4">{t("trans.merkle")}</h2>
            <div className="p-6 rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <LinkIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-sans font-semibold mb-2">{t("trans.whatIsMerkle")}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{t("trans.merkleDesc")}</p>
                  <h3 className="font-sans font-semibold mb-2">{t("trans.howUsed")}</h3>
                  <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                    {merkleSteps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-serif mb-4">{t("trans.dataFlow")}</h2>
            <div className="space-y-3">
              {dataFlowSteps.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-sm">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="text-center">
            <Button asChild size="lg">
              <Link to="/pools">{t("trans.exploreVerified")} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Transparency;
