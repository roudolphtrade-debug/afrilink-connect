import {
  ChevronLeft, ChevronRight, Loader2, Lock, Maximize2, Minimize2, Moon, Search,
  Sun, X, ZoomIn, ZoomOut, LayoutGrid,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

/** Nombre de pages consultables sans compte. */
export const FREE_PAGES = 5;

type PdfDoc = {
  numPages: number;
  getPage: (n: number) => Promise<any>;
  destroy: () => void;
};

async function loadPdfjs() {
  const pdfjs: any = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const worker = await import("pdfjs-dist/legacy/build/pdf.worker.min.mjs?url");
  pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
  return pdfjs;
}

export function PdfReader({
  url,
  title,
  author,
  locked,
  onClose,
  onSignIn,
}: {
  url: string;
  title: string;
  author?: string;
  locked: boolean;
  onClose: () => void;
  onSignIn: () => void;
}) {
  const shellRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const docRef = useRef<PdfDoc | null>(null);
  const renderTaskRef = useRef<any>(null);

  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [dark, setDark] = useState(false);
  const [full, setFull] = useState(false);
  const [thumbsOpen, setThumbsOpen] = useState(false);
  const [thumbs, setThumbs] = useState<Record<number, string>>({});
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<number[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [rendering, setRendering] = useState(false);

  const maxPage = locked ? Math.min(FREE_PAGES, numPages || FREE_PAGES) : numPages;

  /* ---------- chargement du document ---------- */
  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    (async () => {
      try {
        const pdfjs = await loadPdfjs();
        const proxied = /^https?:/i.test(url) ? `/api/public/pdf?src=${encodeURIComponent(url)}` : url;
        const doc = await pdfjs.getDocument({ url: proxied, withCredentials: false }).promise;
        if (cancelled) { doc.destroy(); return; }
        docRef.current = doc;
        setNumPages(doc.numPages);
        setPage(1);
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
      renderTaskRef.current?.cancel?.();
      docRef.current?.destroy();
      docRef.current = null;
    };
  }, [url]);

  /* ---------- rendu de la page courante ---------- */
  const renderPage = useCallback(async (n: number) => {
    const doc = docRef.current;
    const canvas = canvasRef.current;
    if (!doc || !canvas) return;
    setRendering(true);
    try {
      const pdfPage = await doc.getPage(n);
      const measured = viewportRef.current?.clientWidth ?? 0;
      const fallback = Math.min(window.innerWidth - (thumbsOpen ? 200 : 32), 980);
      const containerWidth = Math.max(320, Math.max(measured - 32, fallback));
      const base = pdfPage.getViewport({ scale: 1 });
      const fit = Math.min(containerWidth / base.width, 2.2);
      const viewport = pdfPage.getViewport({ scale: fit * zoom * (window.devicePixelRatio || 1) });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = `${viewport.width / (window.devicePixelRatio || 1)}px`;
      canvas.style.height = `${viewport.height / (window.devicePixelRatio || 1)}px`;
      renderTaskRef.current?.cancel?.();
      const task = pdfPage.render({ canvasContext: canvas.getContext("2d")!, viewport });
      renderTaskRef.current = task;
      await task.promise;
    } catch {
      /* rendu annulé ou page indisponible */
    } finally {
      setRendering(false);
    }
  }, [zoom, thumbsOpen]);

  useEffect(() => {
    if (status === "ready") void renderPage(page);
  }, [status, page, zoom, renderPage]);

  /* ---------- miniatures ---------- */
  useEffect(() => {
    if (!thumbsOpen || status !== "ready") return;
    let cancelled = false;
    (async () => {
      const doc = docRef.current;
      if (!doc) return;
      const total = Math.min(maxPage || doc.numPages, 40);
      for (let n = 1; n <= total; n++) {
        if (cancelled) return;
        if (thumbs[n]) continue;
        const p = await doc.getPage(n);
        const vp = p.getViewport({ scale: 0.25 });
        const c = document.createElement("canvas");
        c.width = vp.width; c.height = vp.height;
        await p.render({ canvasContext: c.getContext("2d")!, viewport: vp }).promise;
        if (cancelled) return;
        setThumbs((t) => ({ ...t, [n]: c.toDataURL("image/jpeg", 0.6) }));
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thumbsOpen, status, maxPage]);

  /* ---------- recherche plein texte ---------- */
  const runSearch = async () => {
    const doc = docRef.current;
    const term = query.trim().toLowerCase();
    if (!doc || !term) { setHits(null); return; }
    setSearching(true);
    const found: number[] = [];
    const limit = Math.min(maxPage || doc.numPages, 60);
    for (let n = 1; n <= limit; n++) {
      const p = await doc.getPage(n);
      const tc = await p.getTextContent();
      const text = tc.items.map((i: any) => i.str).join(" ").toLowerCase();
      if (text.includes(term)) found.push(n);
    }
    setHits(found);
    setSearching(false);
    if (found[0]) setPage(found[0]);
  };

  /* ---------- navigation ---------- */
  const go = useCallback((n: number) => {
    setPage(Math.min(Math.max(1, n), Math.max(1, maxPage)));
  }, [maxPage]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(page + 1);
      if (e.key === "ArrowLeft") go(page - 1);
      if (e.key === "Escape" && !document.fullscreenElement) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [page, go, onClose]);

  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 60) go(page + (dx < 0 ? 1 : -1));
    touchX.current = null;
  };

  const toggleFull = async () => {
    if (!document.fullscreenElement) {
      await shellRef.current?.requestFullscreen?.();
      setFull(true);
    } else {
      await document.exitFullscreen();
      setFull(false);
    }
  };

  const atLock = locked && numPages > FREE_PAGES && page >= FREE_PAGES;
  const progress = numPages ? Math.round((page / numPages) * 100) : 0;

  return (
    <div className="fixed inset-0 z-[60] flex items-stretch justify-center bg-forest/80 backdrop-blur-sm">
      <div
        ref={shellRef}
        className={`flex h-full w-full flex-col ${dark ? "bg-[#0b0f0c] text-white" : "bg-background text-foreground"}`}
      >
        {/* Barre d'outils */}
        <header className={`flex flex-wrap items-center gap-2 border-b px-3 py-2 ${dark ? "border-white/10" : "border-border"}`}>
          <button onClick={onClose} aria-label="Fermer la visionneuse" className="rounded-full p-2 hover:bg-muted/30">
            <X className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{title}</p>
            {author && <p className="truncate text-[11px] opacity-60">{author}</p>}
          </div>

          <div className="flex items-center gap-1">
            <button onClick={() => setThumbsOpen((v) => !v)} aria-label="Miniatures" className={`rounded-full p-2 hover:bg-muted/30 ${thumbsOpen ? "text-accent" : ""}`}>
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.2).toFixed(2)))} aria-label="Dézoomer" className="rounded-full p-2 hover:bg-muted/30">
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="w-10 text-center text-[11px] font-semibold tabular-nums">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom((z) => Math.min(3, +(z + 0.2).toFixed(2)))} aria-label="Zoomer" className="rounded-full p-2 hover:bg-muted/30">
              <ZoomIn className="h-4 w-4" />
            </button>
            <button onClick={() => setDark((v) => !v)} aria-label="Mode sombre" className="rounded-full p-2 hover:bg-muted/30">
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button onClick={toggleFull} aria-label="Plein écran" className="rounded-full p-2 hover:bg-muted/30">
              {full ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); void runSearch(); }}
            className={`flex w-full items-center gap-2 rounded-full border px-3 py-1.5 md:w-64 ${dark ? "border-white/15" : "border-border"}`}
          >
            <Search className="h-3.5 w-3.5 opacity-60" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher dans le document"
              className="w-full bg-transparent text-xs outline-none"
            />
            {searching && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          </form>
        </header>

        {hits && (
          <div className={`flex flex-wrap items-center gap-2 border-b px-3 py-2 text-[11px] ${dark ? "border-white/10" : "border-border"}`}>
            <span className="font-semibold">{hits.length} page(s) contenant « {query} »</span>
            {hits.slice(0, 12).map((h) => (
              <button key={h} onClick={() => go(h)} className="rounded-full border border-accent/40 px-2 py-0.5 font-semibold text-accent">
                p. {h}
              </button>
            ))}
            <button onClick={() => { setHits(null); setQuery(""); }} className="ml-auto underline opacity-70">Effacer</button>
          </div>
        )}

        <div className="flex min-h-0 flex-1">
          {thumbsOpen && (
            <aside className={`hidden w-40 shrink-0 overflow-y-auto border-r p-2 md:block ${dark ? "border-white/10" : "border-border"}`}>
              {Array.from({ length: Math.min(maxPage || 0, 40) }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => go(n)}
                  className={`mb-2 w-full overflow-hidden rounded-lg border text-[10px] ${n === page ? "border-accent" : dark ? "border-white/10" : "border-border"}`}
                >
                  {thumbs[n]
                    ? <img src={thumbs[n]} alt={`Page ${n}`} className="w-full" />
                    : <span className="block py-8 opacity-50">…</span>}
                  <span className="block py-1 font-semibold">{n}</span>
                </button>
              ))}
            </aside>
          )}

          <div
            ref={viewportRef}
            className="relative flex min-w-0 flex-1 items-start justify-center overflow-auto p-3"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {status === "loading" && (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-sm opacity-70">
                <Loader2 className="h-6 w-6 animate-spin" /> Chargement du document…
              </div>
            )}
            {status === "error" && (
              <div className="flex h-full max-w-md flex-col items-center justify-center gap-3 px-6 text-center">
                <p className="font-display text-lg font-semibold">Fichier source indisponible</p>
                <p className="text-sm opacity-70">
                  Ce document provient de l'archive Les Bons Plans du Bled, dont l'hébergement média est
                  hors ligne. La fiche et ses métadonnées sont conservées ; le fichier sera relié dès que
                  la source sera restaurée.
                </p>
                <button onClick={onClose} className="rounded-full border border-border px-4 py-2 text-sm font-semibold">Fermer</button>
              </div>
            )}
            {status === "ready" && (
              <div className="relative">
                <canvas ref={canvasRef} className="rounded-lg shadow-elevated" />
                {rendering && <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin opacity-60" />}
                {atLock && (
                  <div className="absolute inset-0 flex flex-col items-center justify-end gap-3 rounded-lg bg-gradient-to-t from-forest/95 via-forest/70 to-transparent p-6 text-center text-white">
                    <Lock className="h-6 w-6 text-accent" />
                    <p className="font-display text-lg font-semibold">Lecture complète réservée aux membres</p>
                    <p className="max-w-sm text-sm opacity-80">
                      Vous consultez l'aperçu ({FREE_PAGES} pages sur {numPages}). Connectez-vous pour lire l'ouvrage en entier.
                    </p>
                    <button onClick={onSignIn} className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-forest">
                      Se connecter
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Pagination + progression */}
        <footer className={`border-t px-3 py-2 ${dark ? "border-white/10" : "border-border"}`}>
          <div className={`h-1 w-full overflow-hidden rounded-full ${dark ? "bg-white/10" : "bg-muted"}`}>
            <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-2 flex items-center justify-center gap-4 text-sm">
            <button onClick={() => go(page - 1)} disabled={page <= 1} aria-label="Page précédente" className="rounded-full p-2 hover:bg-muted/30 disabled:opacity-30">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="tabular-nums font-semibold">
              {page} / {numPages || "—"}
              {locked && numPages > FREE_PAGES && <span className="ml-2 text-[11px] font-normal opacity-60">aperçu {FREE_PAGES} p.</span>}
            </span>
            <button onClick={() => go(page + 1)} disabled={page >= maxPage} aria-label="Page suivante" className="rounded-full p-2 hover:bg-muted/30 disabled:opacity-30">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
