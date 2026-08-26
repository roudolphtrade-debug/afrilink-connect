import { useState } from "react";

export function Avatar({
  initials,
  color,
  size = 48,
  src,
  alt,
}: {
  initials: string;
  color: string;
  size?: number;
  src?: string;
  alt?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div
      className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-full font-display font-semibold text-white ring-1 ring-black/5 transition-transform duration-300 ease-out"
      style={{ backgroundColor: color, width: size, height: size, fontSize: size * 0.38 }}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt ?? initials}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span aria-hidden={alt ? undefined : true}>{initials}</span>
      )}
    </div>
  );
}
