import { BadgeCheck, Crown, ShieldCheck, Sparkles } from "lucide-react";
import { STATUS_META, type ProStatus } from "@/lib/mock-data";

const STYLES: Record<ProStatus, { className: string; icon: typeof ShieldCheck }> = {
  reference: { className: "bg-muted text-muted-foreground", icon: BadgeCheck },
  recommande: { className: "bg-forest-sage/15 text-forest-sage", icon: Sparkles },
  verifie: { className: "bg-accent/15 text-accent", icon: ShieldCheck },
  equipe: { className: "bg-primary text-primary-foreground", icon: Crown },
};

export function StatusBadge({ status, className = "" }: { status: ProStatus; className?: string }) {
  const s = STYLES[status];
  const Icon = s.icon;
  return (
    <span
      title={STATUS_META[status].description}
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-tight ${s.className} ${className}`}
    >
      <Icon className="h-3 w-3" />
      {STATUS_META[status].label}
    </span>
  );
}
