import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { Calendar, MapPin, Star } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { listPublicEvents, type PublicEvent } from "@/lib/events.functions";

export const Route = createFileRoute("/eventos")({
  head: () => ({
    meta: [
      { title: "Eventos — AA Área 2 Metropolitana" },
      {
        name: "description",
        content:
          "Foros, convenciones, talleres, aniversarios y actividades del Área 2 Metropolitana.",
      },
      { property: "og:title", content: "Eventos AA Área 2" },
      {
        property: "og:description",
        content:
          "Calendario de foros, convenciones, aniversarios y talleres del Área 2.",
      },
    ],
  }),
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({
      queryKey: ["public", "events"],
      queryFn: () => listPublicEvents(),
    }),
  errorComponent: ({ error }) => (
    <PageShell eyebrow="Calendario" title="Eventos" intro="No pudimos cargar los eventos.">
      <p className="text-sm text-ink/70">{error.message}</p>
    </PageShell>
  ),
  component: EventosPage,
});

const monthShort = (d: Date) =>
  d.toLocaleDateString("es-CO", { month: "short" }).replace(".", "");

function fmtRange(e: PublicEvent): string {
  const start = new Date(e.startsAt);
  const time = start.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
  });
  if (!e.endsAt) return time;
  const end = new Date(e.endsAt);
  const sameDay = start.toDateString() === end.toDateString();
  if (sameDay) {
    return `${time} – ${end.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}`;
  }
  return `${start.toLocaleDateString("es-CO", { day: "2-digit", month: "short" })} – ${end.toLocaleDateString(
    "es-CO",
    { day: "2-digit", month: "short" },
  )}`;
}

function EventosPage() {
  const call = useServerFn(listPublicEvents);
  const { data: events } = useSuspenseQuery({
    queryKey: ["public", "events"],
    queryFn: () => call(),
  });

  const now = Date.now();
  const upcoming = events.filter((e) => new Date(e.endsAt ?? e.startsAt).getTime() >= now);
  const past = events
    .filter((e) => new Date(e.endsAt ?? e.startsAt).getTime() < now)
    .reverse();

  const municipalities = useMemo(() => {
    const set = new Map<string, string>();
    for (const e of events) if (e.municipalityName) set.set(e.municipalityName, e.municipalityName);
    return Array.from(set.keys()).sort();
  }, [events]);

  const [muni, setMuni] = useState("");
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  const filter = (arr: PublicEvent[]) =>
    muni ? arr.filter((e) => e.municipalityName === muni) : arr;

  const current = tab === "upcoming" ? filter(upcoming) : filter(past);

  return (
    <PageShell
      eyebrow="Calendario"
      title="Eventos"
      intro="Foros, convenciones, talleres y aniversarios del Área 2 Metropolitana."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-full border border-brand/15 bg-paper p-1 text-sm">
          <button
            type="button"
            onClick={() => setTab("upcoming")}
            className={
              "rounded-full px-4 py-1.5 font-semibold " +
              (tab === "upcoming" ? "bg-brand text-paper" : "text-ink/70 hover:text-brand")
            }
          >
            Próximos ({upcoming.length})
          </button>
          <button
            type="button"
            onClick={() => setTab("past")}
            className={
              "rounded-full px-4 py-1.5 font-semibold " +
              (tab === "past" ? "bg-brand text-paper" : "text-ink/70 hover:text-brand")
            }
          >
            Pasados ({past.length})
          </button>
        </div>
        <select
          value={muni}
          onChange={(e) => setMuni(e.target.value)}
          className="rounded-full border border-brand/15 bg-paper px-4 py-2 text-sm focus:border-brand/40 focus:outline-none"
        >
          <option value="">Todos los municipios</option>
          {municipalities.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {current.length === 0 ? (
        <div className="rounded-2xl bg-paper p-10 text-center text-sm text-ink/60 ring-1 ring-black/5">
          {tab === "upcoming"
            ? "No hay eventos próximos publicados."
            : "No hay eventos pasados que mostrar."}
        </div>
      ) : (
        <div className="space-y-4">
          {current.map((e) => (
            <EventCard key={e.id} e={e} />
          ))}
        </div>
      )}

      <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-ink/55">
        Fechas y sedes están sujetas a confirmación por parte de los comités organizadores.
      </p>
    </PageShell>
  );
}

function EventCard({ e }: { e: PublicEvent }) {
  const start = new Date(e.startsAt);
  return (
    <Link
      to="/eventos/$slug"
      params={{ slug: e.slug }}
      className="group flex flex-col gap-4 rounded-2xl bg-paper p-6 ring-1 ring-black/5 transition-shadow hover:shadow-md md:flex-row md:items-center md:gap-8 md:p-8"
    >
      <div className="flex size-20 shrink-0 flex-col items-center justify-center rounded-xl bg-brand text-paper">
        <span className="text-[10px] font-semibold uppercase tracking-widest opacity-70">
          {monthShort(start)}
        </span>
        <span className="font-serif text-3xl italic leading-none">
          {String(start.getDate()).padStart(2, "0")}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          {e.isFeatured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-amber-700">
              <Star className="size-3" /> Destacado
            </span>
          )}
          {e.municipalityName && (
            <span className="text-xs font-semibold uppercase tracking-widest text-brand/80">
              {e.municipalityName}
            </span>
          )}
        </div>
        <h3 className="mb-1 font-serif text-xl text-brand group-hover:underline">
          {e.title}
        </h3>
        {e.location && (
          <p className="flex items-center gap-1.5 text-sm text-ink/80">
            <MapPin className="size-3.5 text-brand/70" /> {e.location}
          </p>
        )}
      </div>
      <div className="text-sm text-ink/80">
        <Calendar className="mb-1 size-4 text-brand/80" />
        {fmtRange(e)}
      </div>
    </Link>
  );
}
