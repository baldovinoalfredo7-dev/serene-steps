import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { groups } from "@/lib/groups-data";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/grupos")({
  head: () => ({
    meta: [
      { title: "Encuentra un Grupo — AA Área 2 Metropolitana" },
      {
        name: "description",
        content:
          "Nueve grupos de Alcohólicos Anónimos en el Área 2 Metropolitana. Encuentra dirección, horarios y cómo llegar.",
      },
      { property: "og:title", content: "Encuentra un Grupo — AA Área 2 Metropolitana" },
      {
        property: "og:description",
        content: "Nueve grupos de AA con horarios y direcciones en el Área 2 Metropolitana.",
      },
    ],
  }),
  component: GruposLayout,
});

function GruposLayout() {
  const matches = useMatches();
  const isChild = matches.some((m) => m.routeId === "/grupos/$slug");
  if (isChild) return <Outlet />;
  return <GruposIndex />;
}

function GruposIndex() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.municipality.toLowerCase().includes(q) ||
        g.addressLine.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <PageShell
      eyebrow="Directorio"
      title="Encuentra un grupo"
      intro="Nueve grupos del Área 2 Metropolitana. Elige el más cercano y da el primer paso."
    >
      <div className="mx-auto mb-10 max-w-xl">
        <label className="relative block">
          <span className="sr-only">Buscar por grupo, municipio o dirección</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca por municipio, grupo o dirección..."
            className="w-full rounded-full border border-brand/10 bg-paper py-3 pl-11 pr-4 text-sm outline-none ring-brand/30 transition-shadow focus:ring-2"
          />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((g) => (
          <Link
            key={g.slug}
            to="/grupos/$slug"
            params={{ slug: g.slug }}
            className="group flex flex-col rounded-2xl bg-paper p-8 ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:ring-brand/20"
          >
            <span className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand/40">
              {g.municipality}
            </span>
            <h3 className="mb-2 font-serif text-xl text-brand">{g.name}</h3>
            <p className="mb-8 max-w-[35ch] text-sm text-ink/60">{g.addressLine}</p>
            <div className="mt-auto flex items-center gap-2 border-t border-brand/5 pt-6 text-sm font-semibold text-brand">
              Ver información
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-ink/50">
          No encontramos grupos con esa búsqueda. Intenta con un municipio distinto.
        </p>
      )}
    </PageShell>
  );
}
