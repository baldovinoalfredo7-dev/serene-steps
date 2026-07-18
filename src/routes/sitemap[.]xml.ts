import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { groups } from "@/lib/groups-data";

const BASE_URL = "";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly" | "yearly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/grupos", changefreq: "weekly", priority: "0.9" },
          { path: "/que-es-aa", changefreq: "monthly", priority: "0.8" },
          { path: "/primera-reunion", changefreq: "monthly", priority: "0.8" },
          { path: "/tengo-un-problema", changefreq: "monthly", priority: "0.7" },
          { path: "/testimonios", changefreq: "monthly", priority: "0.6" },
          { path: "/literatura", changefreq: "monthly", priority: "0.5" },
          { path: "/eventos", changefreq: "weekly", priority: "0.6" },
          { path: "/contacto", changefreq: "monthly", priority: "0.5" },
          { path: "/necesito-ayuda", changefreq: "yearly", priority: "0.7" },
          ...groups.map((g) => ({
            path: `/grupos/${g.slug}`,
            changefreq: "monthly" as const,
            priority: "0.7",
          })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
