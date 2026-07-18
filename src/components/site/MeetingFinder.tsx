import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  ExternalLink,
  MapPin,
  Search,
} from "lucide-react";
import { groups, municipalities } from "@/lib/groups-data";

const dayNames = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

type Result = {
  slug: string;
  name: string;
  municipality: string;
  addressLine: string;
  time: string;
  dayLabel: string;
  mapsUrl: string;
};

function todayWeekday() {
  return new Date().getDay();
}

export function MeetingFinder() {
  const [municipality, setMunicipality] = useState<string>("all");
  const [day, setDay] = useState<string>(String(todayWeekday()));
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Result[]>([]);

  const filteredCount = useMemo(() => {
    return groups.reduce((acc, g) => {
      if (municipality !== "all" && g.municipality !== municipality) return acc;
      const matches = g.meetings.filter(
        (m) => day === "all" || m.weekday === Number(day),
      );
      return acc + matches.length;
    }, 0);
  }, [municipality, day]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const out: Result[] = [];
    for (const g of groups) {
      if (municipality !== "all" && g.municipality !== municipality) continue;
      for (const m of g.meetings) {
        if (day !== "all" && m.weekday !== Number(day)) continue;
        out.push({
          slug: g.slug,
          name: g.name,
          municipality: g.municipality,
          addressLine: g.addressLine,
          time: `${m.start}–${m.end} h`,
          dayLabel: dayNames[m.weekday],
          mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            g.addressFull,
          )}`,
        });
      }
    }
    out.sort((a, b) => a.time.localeCompare(b.time));
    setResults(out);
    setSubmitted(true);
  }

  return (
    <section
      id="reunion-hoy"
      className="bg-brand/[0.04] py-20 md:py-28"
      aria-labelledby="reunion-hoy-title"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center md:mb-14">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-brand/60">
            Acceso rápido
          </span>
          <h2
            id="reunion-hoy-title"
            className="font-serif text-4xl italic text-brand md:text-5xl lg:text-6xl"
          >
            Necesito una reunión hoy
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink/70">
            Elige tu municipio y el día. Te mostramos las reuniones disponibles
            en el Área 2 Metropolitana.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="rounded-3xl bg-paper p-6 shadow-soft md:p-10"
        >
          <div className="grid gap-5 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-brand/70">
                <MapPin className="size-4" strokeWidth={1.8} />
                Municipio
              </span>
              <select
                value={municipality}
                onChange={(e) => setMunicipality(e.target.value)}
                className="min-h-12 w-full rounded-full border border-brand/15 bg-paper px-5 text-base text-ink shadow-sm outline-none transition-colors focus:border-brand focus:ring-4 focus:ring-brand/15"
              >
                <option value="all">Todos los municipios</option>
                {municipalities.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-brand/70">
                <CalendarDays className="size-4" strokeWidth={1.8} />
                Día de la semana
              </span>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="min-h-12 w-full rounded-full border border-brand/15 bg-paper px-5 text-base text-ink shadow-sm outline-none transition-colors focus:border-brand focus:ring-4 focus:ring-brand/15"
              >
                <option value={String(todayWeekday())}>
                  Hoy ({dayNames[todayWeekday()]})
                </option>
                <option value="all">Todos los días</option>
                {dayNames.map((d, i) => (
                  <option key={d} value={String(i)}>
                    {d}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-paper shadow-lift transition-all hover:-translate-y-0.5 hover:bg-brand-soft focus-visible:ring-4 focus-visible:ring-brand/30"
            >
              <Search className="size-4" strokeWidth={2} />
              Buscar reuniones
            </button>
          </div>

          {!submitted && (
            <p className="mt-4 text-sm text-ink/60">
              {filteredCount > 0
                ? `${filteredCount} reunión${filteredCount === 1 ? "" : "es"} coincidente${
                    filteredCount === 1 ? "" : "s"
                  } con estos filtros.`
                : "No hay reuniones con estos filtros. Prueba con otro día."}
            </p>
          )}
        </form>

        <div className="mt-10">
          {submitted && results.length === 0 && (
            <div className="rounded-3xl border border-dashed border-brand/20 bg-paper p-10 text-center">
              <p className="font-serif text-xl italic text-brand">
                No encontramos reuniones con estos filtros.
              </p>
              <p className="mt-3 text-ink/70">
                Intenta con otro día o selecciona “Todos los municipios”.
              </p>
            </div>
          )}

          {submitted && results.length > 0 && (
            <>
              <p className="mb-6 text-sm font-semibold uppercase tracking-[0.15em] text-brand/70">
                {results.length} reunión{results.length === 1 ? "" : "es"} disponible
                {results.length === 1 ? "" : "s"}
              </p>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {results.map((r, i) => (
                  <ResultCard key={`${r.slug}-${i}`} r={r} />
                ))}
              </div>
            </>
          )}

          {!submitted && (
            <div className="rounded-3xl border border-dashed border-brand/20 bg-paper/60 p-10 text-center">
              <p className="font-serif text-xl italic text-brand">
                Los resultados aparecerán aquí.
              </p>
              <p className="mt-3 text-ink/70">
                Al pulsar “Buscar reuniones” verás los grupos con dirección,
                horario y cómo llegar.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ResultCard({ r }: { r: Result }) {
  return (
    <article className="flex flex-col rounded-3xl bg-paper p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift md:p-8">
      <span className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand/60">
        {r.municipality}
      </span>
      <h3 className="mb-4 font-serif text-2xl italic text-brand">{r.name}</h3>

      <ul className="mb-6 space-y-2 text-sm text-ink/75">
        <li className="flex items-start gap-2">
          <Clock className="mt-0.5 size-4 shrink-0 text-brand/60" strokeWidth={1.8} />
          <span>
            {r.dayLabel} · {r.time}
          </span>
        </li>
        <li className="flex items-start gap-2">
          <MapPin className="mt-0.5 size-4 shrink-0 text-brand/60" strokeWidth={1.8} />
          <span>{r.addressLine}</span>
        </li>
      </ul>

      <div className="mt-auto flex flex-col gap-3">
        <a
          href={r.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-brand/25 px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-brand transition-colors hover:bg-brand hover:text-paper"
        >
          <ExternalLink className="size-4" />
          Ver ubicación en Google Maps
        </a>
        <Link
          to="/grupos/$slug"
          params={{ slug: r.slug }}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-paper transition-colors hover:bg-brand-soft"
        >
          Más información
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}
