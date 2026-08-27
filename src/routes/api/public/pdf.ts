import { createFileRoute } from "@tanstack/react-router";

/** Hôtes autorisés : sources du domaine public utilisées par la bibliothèque AfriLink. */
const ALLOWED_HOSTS = new Set([
  "upload.wikimedia.org",
  "commons.wikimedia.org",
  "ia600000.us.archive.org",
  "archive.org",
  "ia801604.us.archive.org",
]);

/**
 * Relais de lecture pour la visionneuse : évite les blocages de hotlink et
 * garantit des requêtes Range propres pour PDF.js. Aucun contenu n'est stocké.
 */
export const Route = createFileRoute("/api/public/pdf")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const src = new URL(request.url).searchParams.get("src");
        if (!src) return new Response("Missing src", { status: 400 });

        let target: URL;
        try {
          target = new URL(src);
        } catch {
          return new Response("Invalid src", { status: 400 });
        }
        if (target.protocol !== "https:" || !ALLOWED_HOSTS.has(target.hostname)) {
          return new Response("Source non autorisée", { status: 403 });
        }

        const range = request.headers.get("range");
        const upstream = await fetch(target.toString(), {
          headers: {
            "user-agent": "AfriLinkLibrary/1.0 (https://afrilink-connect.lovable.app; lecture domaine public)",
            accept: "application/pdf,*/*",
            ...(range ? { range } : {}),
          },
        });

        if (!upstream.ok && upstream.status !== 206) {
          return new Response("Document indisponible", { status: 502 });
        }

        const headers = new Headers();
        headers.set("content-type", "application/pdf");
        headers.set("accept-ranges", "bytes");
        headers.set("cache-control", "public, max-age=86400");
        for (const h of ["content-length", "content-range", "etag", "last-modified"]) {
          const v = upstream.headers.get(h);
          if (v) headers.set(h, v);
        }
        return new Response(upstream.body, { status: upstream.status, headers });
      },
    },
  },
});
