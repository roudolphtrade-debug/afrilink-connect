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
        className={`${variant === "mark" ? "h-10 w-10 object-contain" : "h-12 w-auto object-contain"} ${className}`}
      />
    </picture>
  );
}
