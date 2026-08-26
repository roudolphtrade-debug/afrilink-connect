export function Logo({
  variant = "full",
  className = "",
  loading = "eager",
}: {
  variant?: "full" | "mark";
  className?: string;
  loading?: "eager" | "lazy";
}) {
  return (
    <picture>
      <source srcSet="/afrilink-logo.webp" type="image/webp" />
      <img
        src="/afrilink-logo-fallback.png"
        width={360}
        height={240}
        loading={loading}
        alt="AfriLink — Les Bons Plans du Bled"
        className={`${variant === "mark" ? "h-12 w-12 object-contain" : "h-[3.75rem] w-auto object-contain"} shrink-0 ${className}`}
      />
    </picture>
  );
}
