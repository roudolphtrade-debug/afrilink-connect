import { useRef, useState } from "react";
import { Camera, Loader2, Trash2 } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { fileToSquareDataUrl, validateAvatarFile } from "@/lib/avatar-upload";

/** Avatar cliquable avec import de photo (recadrage carré automatique). */
export function AvatarPicker({
  initials,
  color,
  src,
  size = 96,
  hasCustom,
  onChange,
  showRemove = false,
  className = "",
}: {
  initials: string;
  color: string;
  src?: string;
  size?: number;
  hasCustom: boolean;
  onChange: (dataUrl: string | null) => void;
  showRemove?: boolean;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pick = async (file?: File) => {
    if (!file) return;
    const invalid = validateAvatarFile(file);
    if (invalid) return setError(invalid);
    setError(null);
    setBusy(true);
    try {
      onChange(await fileToSquareDataUrl(file));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Import impossible.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar initials={initials} color={color} src={src} size={size} />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            aria-label="Changer la photo de profil"
            title="Changer la photo de profil"
            className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full border-2 border-card bg-primary text-primary-foreground shadow-soft transition hover:opacity-90 disabled:opacity-60"
            disabled={busy}
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => void pick(e.target.files?.[0])}
          />
        </div>
        {showRemove && hasCustom && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold transition hover:border-destructive/40 hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" /> Retirer la photo
          </button>
        )}
      </div>
      {error && <p className="mt-2 text-xs font-semibold text-destructive">{error}</p>}
    </div>
  );
}
