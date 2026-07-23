import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, MapPin, Navigation, Search } from "lucide-react";
import { type Group, weekdayLabels } from "@/lib/groups-data";

export type GroupFinderVariant = "full" | "compact";

interface GroupFinderProps {
  groups: Group[];
  variant?: GroupFinderVariant;
  /** Máximo de tarjetas a mostrar (útil en la Home). */
  maxResults?: number;
  /** Mensaje cuando no hay ningún grupo en el directorio. */
  emptyDirectory?: React.ReactNode;
}

function normalize(v: string) {
  return v
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Módulo único de "Encuentra un grupo".
 *
 * Utilizado tanto por la página `/grupos` (variant="full") como por la
 * sección resumida de la Home (variant="compact"). Cualquier cambio en el
 * buscador o en las tarjetas se refleja automáticamente en ambos lugares.
 */
export function GroupFinder({
  groups,
  variant = "full",
  maxResults,
  emptyDirectory,
}: GroupFinderProps) {
  const [query, setQuery] = useState("");
  const [municipality, setMunicipality] = useState("");

  const municipalities = useMemo(
    () =>
      Array.from(new Set(groups.map((g) => g.municipality).filter(Boolean))).sort(),
    [groups],
  );

  const filtered = useMemo(() => {
    const q = normalize(query);
    return groups.filter((g) => {
      if (municipality && g.municipality !== municipality) return false;
      if (!q) return true;
      const haystack = normalize(
        `${g.name} ${g.municipality} ${g.addressLine} ${g.addressFull}`,
      );
      return haystack.includes(q);
    });
  }, [groups, query, municipality]);

  const visible =
    typeof maxResults === "number" ? filtered.slice(0, maxResults) : filtered;

  if (groups.length === 0 && emptyDirectory) {
    return <>{emptyDirectory}</>;
  }

  return (
    <div className="space-y-10">
      {/* Buscador */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-brand/50"
            strokeWidth={1.8}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ciudad, barrio, dirección o nombre del grupo"
            aria-label="Buscar grupo por ciudad, barrio o nombre"
            className="min-h-14 w-full rounded-full border border-brand/15 bg-paper pl-14 pr-6 text-base text-ink shadow-sm outline-none transition-colors placeholder:text-ink/50 focus:border-brand focus:ring-4 focus:ring-brand/15"
          />
        </div>
        {municipalities.length > 0 && (
          <select
            value={municipality}
            onChange={(e) => setMunicipality(e.target.value)}
            aria-label="Filtrar por ciudad o municipio"
            className="min-h-14 rounded-full border border-brand/15 bg-paper px-5 text-base text-ink shadow-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/15 sm:w-64"
          >
            <option value="">Todas las ciudades</option>
            {municipalities.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Resultados */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-brand/20 bg-paper/60 p-10 text-center">
          <p className="font-serif text-xl italic text-brand">
            No encontramos grupos con esa búsqueda.
          </p>
          <p className="mt-3 text-ink/85">
            Prueba con el nombre de tu ciudad, barrio o del grupo.
          </p>
        </div>
      ) : (
        <>
          {variant === "full" && (
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-brand/70">
              {filtered.length} {filtered.length === 1 ? "grupo" : "grupos"}
            </p>
          )}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((g) => (
              <GroupCard key={g.slug} g={g} variant={variant} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function GroupCard({ g, variant }: { g: Group; variant: GroupFinderVariant }) {
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    g.addressFull,
  )}`;

  const schedule = g.meetings
    .slice()
    .sort((a, b) => a.weekday - b.weekday || a.start.localeCompare(b.start))
    .map((m) => `${weekdayLabels[m.weekday]} · ${m.start}–${m.end}`);

  if (variant === "compact") {
    return (
      <Link
        to="/grupos/$slug"
        params={{ slug: g.slug }}
        className="flex h-full flex-col justify-between gap-6 rounded-3xl bg-paper p-7 shadow-soft ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-lift"
      >
        <div>
          <span className="mb-3 block text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand/70">
            {g.municipality}
          </span>
          <h3 className="font-serif text-xl leading-tight text-brand md:text-2xl">
            {g.name}
          </h3>
          <p className="mt-2 text-sm text-ink/75">{g.addressLine}</p>
        </div>
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
          Ver información <ArrowRight className="size-4" />
        </span>
      </Link>
    );
  }

  return (
    <article className="flex flex-col rounded-3xl bg-paper p-7 shadow-soft ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-lift md:p-8">
      <span className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand/80">
        {g.municipality}
      </span>
      <h3 className="mb-4 font-serif text-2xl italic text-brand">{g.name}</h3>

      <p className="mb-5 flex items-start gap-2 text-sm text-ink/80">
        <MapPin className="mt-0.5 size-4 shrink-0 text-brand/70" strokeWidth={1.8} />
        <span>{g.addressLine}</span>
      </p>

      {schedule.length > 0 && (
        <ul className="mb-6 space-y-1.5 text-sm text-ink/85">
          {schedule.map((line) => (
            <li key={line} className="flex items-start gap-2">
              <Clock className="mt-0.5 size-4 shrink-0 text-brand/70" strokeWidth={1.8} />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex flex-col gap-3">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-brand/25 px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-brand transition-colors hover:bg-brand hover:text-paper"
        >
          <Navigation className="size-4" />
          Cómo llegar
        </a>
        <Link
          to="/grupos/$slug"
          params={{ slug: g.slug }}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-paper transition-colors hover:bg-brand/90"
        >
          Más información
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}
