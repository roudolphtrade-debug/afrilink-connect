/**
 * Lecture + recadrage carré d'une photo de profil côté navigateur.
 * Aucune donnée n'est envoyée : l'image est réduite puis stockée en local
 * (data URL JPEG) pendant la phase de démonstration.
 */
export const MAX_AVATAR_BYTES = 8 * 1024 * 1024;

export function validateAvatarFile(file: File): string | null {
  if (!file.type.startsWith("image/")) return "Choisissez une image (JPG, PNG, WebP ou HEIC).";
  if (file.size > MAX_AVATAR_BYTES) return "Image trop lourde : 8 Mo maximum.";
  return null;
}

export function fileToSquareDataUrl(file: File, size = 320): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Lecture du fichier impossible."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Format d'image non pris en charge."));
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Recadrage impossible sur cet appareil."));
        const side = Math.min(img.width, img.height);
        ctx.drawImage(
          img,
          (img.width - side) / 2,
          (img.height - side) / 2,
          side,
          side,
          0,
          0,
          size,
          size,
        );
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
