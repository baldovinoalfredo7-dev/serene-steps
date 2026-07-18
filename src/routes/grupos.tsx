import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, MapPin, Clock, Search } from "lucide-react";
import {
  groups,
  municipalities,
  weekdayLabels,
  weekdayShort,
  meetingTypeLabel,
  getTimeOfDay,
  getPrimaryMeeting,
  type TimeOfDay,
  type Group,
} from "@/lib/groups-data";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/grupos")({
  head: () => ({
    meta: [
      { title: "Encuentra un Grupo — AA Área 2 Metropolitana" },
      {
        name: "description",
        content:
          "Busca reuniones de Alcohólicos Anónimos en el Área 2 Metropolitana por municipio, día y horario.",
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

type DayFilter = "hoy" | "manana-dia" | "todos";
type MunicipalityFilter = "todos" | (typeof municipalities)[number];
type TimeFilter = "todos" | TimeOfDay;

function GruposIndex() {
  const [municipality, setMunicipality] = useState<MunicipalityFilter>("todos");
  const [day, setDay] = useState<DayFilter>("todos");
  const [time, setTime] = useState<TimeFilter>("todos");
  const [applied, setApplied] = useState({
    municipality: "todos" as MunicipalityFilter,
    day: "todos" as DayFilter,
    time: "todos" as TimeFilter,
  });

  const today = new Date().getDay();

  const filtered = useMemo(() => {
    return groups.filter((g) => {
      if (applied.municipality !== "todos" && g.municipality !== applied.municipality)
        return false;

      const targetDay =
        applied.day === "hoy" ? today : applied.day === "manana-dia" ? (today + 1) % 7 : null;

      const meetings = g.meetings.filter((m) => {
        if (targetDay !== null && m.weekday !== targetDay) return false;
        if (applied.time !== "todos" && getTimeOfDay(m.start) !== applied.time) return false;
        return true;
      });

      return meetings.length > 0;
    });
  }, [applied, today]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied({ municipality, day, time });
    // scroll to results
    document.getElementById("resultados")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <PageShell
      eyebrow="Directorio"
      title="Encuentra un grupo"
      intro="Nueve grupos del Área 2 Metropolitana. Filtra por municipio, día y horario para encontrar la reunión que mejor se ajuste a ti."
    >
      {/* Buscador */}
      <form
        onSubmit={onSubmit}
        className="mb-14 rounded-3xl bg-paper p-6 shadow-sm ring-1 ring-black/5 md:p-10"
      >
        <div className="grid gap-6 md:grid-cols-3">
          <FilterField label="Municipio">
            <select
              value={municipality}
              onChange={(e) => setMunicipality(e.target.value as MunicipalityFilter)}
              className="w-full rounded-lg border border-brand/15 bg-paper px-4 py-3 text-sm text-brand outline-none transition focus:border-brand/40 focus:ring-2 focus:ring-brand/20"
            >
              <option value="todos">Todos los municipios</option>
              {municipalities.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </FilterField>

          <FilterField label="Día">
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { v: "hoy", l: "Hoy" },
                  { v: "manana-dia", l: "Mañana" },
                  { v: "todos", l: "Todos" },
                ] as { v: DayFilter; l: string }[]
              ).map((opt) => (
                <SegBtn
                  key={opt.v}
                  active={day === opt.v}
                  onClick={() => setDay(opt.v)}
                  label={opt.l}
                />
              ))}
            </div>
          </FilterField>

          <FilterField label="Horario">
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { v: "manana", l: "Mañana" },
                  { v: "tarde", l: "Tarde" },
                  { v: "noche", l: "Noche" },
                ] as { v: TimeOfDay; l: string }[]
              ).map((opt) => (
                <SegBtn
                  key={opt.v}
                  active={time === opt.v}
                  onClick={() => setTime(time === opt.v ? "todos" : opt.v)}
                  label={opt.l}
                />
              ))}
            </div>
          </FilterField>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand px-10 py-4 text-sm font-semibold uppercase tracking-widest text-paper shadow-lg shadow-brand/20 transition hover:bg-brand/90 md:w-auto"
          >
            <Search className="size-4" />
            Buscar reuniones
          </button>
          <button
            type="button"
            onClick={() => {
              setMunicipality("todos");
              setDay("todos");
              setTime("todos");
              setApplied({ municipality: "todos", day: "todos", time: "todos" });
            }}
            className="text-xs font-medium uppercase tracking-widest text-ink/40 transition hover:text-brand"
          >
            Limpiar filtros
          </button>
        </div>
      </form>

      {/* Resultados */}
      <div id="resultados" className="mb-6 flex items-baseline justify-between">
        <h2 className="font-serif text-2xl italic text-brand">
          {filtered.length} {filtered.length === 1 ? "grupo encontrado" : "grupos encontrados"}
        </h2>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl bg-soft/60 p-12 text-center">
          <p className="text-ink/60">
            No encontramos reuniones con esos criterios. Prueba ampliar el municipio, el día o el
            horario.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((g) => (
            <GroupCard key={g.slug} g={g} />
          ))}
        </div>
      )}
    </PageShell>
  );
}

function FilterField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.2em] text-brand/50">
        {label}
      </span>
      {children}
    </div>
  );
}

function SegBtn({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-lg px-3 py-3 text-xs font-semibold transition " +
        (active
          ? "bg-brand text-paper shadow-sm"
          : "bg-soft text-ink/60 hover:bg-brand/5 hover:text-brand")
      }
    >
      {label}
    </button>
  );
}

function GroupCard({ g }: { g: Group }) {
  const primary = getPrimaryMeeting(g);
  return (
    <Link
      to="/grupos/$slug"
      params={{ slug: g.slug }}
      className="group flex flex-col rounded-2xl bg-paper p-8 ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:ring-brand/20"
    >
      <span className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand/40">
        {g.municipality}
      </span>
      <h3 className="mb-3 font-serif text-xl text-brand">{g.name}</h3>
      <p className="mb-5 flex items-start gap-2 text-sm text-ink/60">
        <MapPin className="mt-0.5 size-4 shrink-0 text-brand/40" />
        <span>{g.addressLine}</span>
      </p>

      {primary && (
        <div className="mb-3 flex items-center gap-2 text-sm text-ink/70">
          <Clock className="size-4 text-brand/50" />
          <span>
            {weekdayLabels[primary.weekday]}{" "}
            <span className="font-mono tabular-nums">{primary.start}</span>
          </span>
        </div>
      )}

      <div className="mb-6 flex flex-wrap gap-1.5">
        {Array.from(new Set(g.meetings.map((m) => m.type))).map((t) => (
          <span
            key={t}
            className="rounded-full bg-brand/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-brand/70"
          >
            {meetingTypeLabel[t]}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-2 border-t border-brand/5 pt-5 text-sm font-semibold text-brand">
        Ver información
        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _keepWeekdayShort = weekdayShort;
