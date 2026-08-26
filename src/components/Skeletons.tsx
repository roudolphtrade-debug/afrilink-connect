export function Shimmer({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-full bg-muted ${className}`} />;
}

export function ProCardSkeleton() {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-start gap-4">
        <Shimmer className="h-14 w-14 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <Shimmer className="h-4 w-2/3" />
          <Shimmer className="h-3 w-1/2" />
          <Shimmer className="h-3 w-1/4" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Shimmer className="h-3 w-full" />
        <Shimmer className="h-3 w-4/5" />
      </div>
      <Shimmer className="mt-5 h-9 w-full" />
    </div>
  );
}

export function PostSkeleton() {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center gap-3">
        <Shimmer className="h-12 w-12" />
        <div className="flex-1 space-y-2">
          <Shimmer className="h-3.5 w-1/3" />
          <Shimmer className="h-3 w-1/4" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Shimmer className="h-4 w-3/4" />
        <Shimmer className="h-3 w-full" />
        <Shimmer className="h-3 w-5/6" />
      </div>
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  desc,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
      <span className="icon-circle mx-auto">{icon}</span>
      <p className="mt-4 font-display text-lg font-semibold">{title}</p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">{desc}</p>
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}
