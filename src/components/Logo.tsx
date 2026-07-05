import logoAsset from "@/assets/afrilink-logo.png.asset.json";

export function Logo({ variant = "full", className = "" }: { variant?: "full" | "mark"; className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="AfriLink — Les Bons Plans du Bled"
      className={`${variant === "mark" ? "h-10 w-10 object-contain" : "h-12 w-auto object-contain"} ${className}`}
    />
  );
}
