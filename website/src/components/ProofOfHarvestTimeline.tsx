import { CheckCircle2, Truck, ShoppingCart, Landmark, Database, Shield } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const stepIcons = [CheckCircle2, Truck, ShoppingCart, Landmark, Database, Shield];
const stepKeys = [
  { title: "poh.step1.title", desc: "poh.step1.desc" },
  { title: "poh.step2.title", desc: "poh.step2.desc" },
  { title: "poh.step3.title", desc: "poh.step3.desc" },
  { title: "poh.step4.title", desc: "poh.step4.desc" },
  { title: "poh.step5.title", desc: "poh.step5.desc" },
  { title: "poh.step6.title", desc: "poh.step6.desc" },
] as const;

const ProofOfHarvestTimeline = ({ compact = false }: { compact?: boolean }) => {
  const { t } = useI18n();

  return (
    <div className={compact ? "space-y-4" : "space-y-6"}>
      {stepKeys.map((step, i) => {
        const Icon = stepIcons[i];
        return (
          <div key={i} className="flex gap-4 group">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              {i < stepKeys.length - 1 && <div className="w-px flex-1 bg-border/50 mt-2" />}
            </div>
            <div className={compact ? "pb-4" : "pb-6"}>
              <h4 className="font-sans font-semibold text-sm">{t(step.title as any)}</h4>
              <p className="text-sm text-muted-foreground mt-1">{t(step.desc as any)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProofOfHarvestTimeline;
