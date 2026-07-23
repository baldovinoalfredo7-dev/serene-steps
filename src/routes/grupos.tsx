import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Clock, MapPin, Navigation, Search } from "lucide-react";
import {
  placeholderGroups,
  formatMeetings,
  type PlaceholderGroup,
} from "@/lib/grupos-placeholder";

export const Route = createFileRoute("/grupos")({
  head: () => ({
    meta: [
      { title: "Encuentra un grupo de Alcohólicos Anónimos" },
      {
        name: "description",
        content:
          "Busca un grupo de Alcohólicos Anónimos por ciudad, barrio o nombre. Consulta horarios, dirección y cómo llegar.",
      },
      { property: "og:title", content: "Encuentra un grupo de Alcohólicos Anónimos" },
      {
        property: "og:description",
        content:
          "Consulta los horarios de reunión, la dirección y la forma de llegar al grupo que mejor se adapte a tu ubicación.",
      },
      { property: "og:url", content: "/grupos" },
    ],
    links: [{ rel: "canonical", href: "/grupos" }],
  }),
  component: GruposLayout,
});

function GruposLayout() {
  const matches = useMatches();
  const isChild = matches.some((m) => m.routeId === "/grupos/$slug");
  if (isChild) return <Outlet />;
  return <GruposIndex />;
}

function normalize(v: string) {
  return v
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function GruposIndex() {
  const [query, setQuery] = useState("");

  const cities = useMemo(
    () => Array.from(new Set(placeholderGroups.map((g) => g.city))).sort(),
    [],
  );

  const results = useMemo(() => {
    const q = normalize(query);
    if (!q) return placeholderGroups;
    return placeholderGroups.filter((g) => {
      const haystack = normalize(`${g.name} ${g.city} ${g.neighborhood} ${g.addressLine}`);
      return haystack.includes(q);
    });
  }, [query]);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-brand/5 bg-soft/40 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-balance font-serif text-4xl italic leading-tight text-brand md:text-6xl">
            Encuentra un grupo de Alcohólicos Anónimos
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-ink/85">
            Aquí puedes encontrar el grupo que mejor se adapte a tu ubicación. Consulta los
            horarios de reunión, la dirección y la forma de llegar.
          </p>
        </div>
      </section>

      {/* Introducción */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-serif text-3xl italic text-brand md:text-4xl">
            ¿Qué es un grupo de Alcohólicos Anónimos?
          </h2>
          <div className="mx-auto mt-6 space-y-4 text-pretty text-base leading-relaxed text-ink/85 md:text-lg">
            <p>
              Un grupo de Alcohólicos Anónimos es una reunión donde personas que
              comparten su experiencia, fortaleza y esperanza se ayudan mutuamente
              para recuperarse del alcoholismo.
            </p>
            <p>
              Todos los grupos están abiertos a recibir a quien tenga el deseo de
              dejar de beber.
            </p>
            <p>
              En el Área 2 Metropolitana de Barranquilla y en las áreas vecinas
              existen diversos grupos ubicados en diferentes municipios,
              dispuestos a recibir con respeto y cordialidad a cualquier persona
              que busque ayuda.
            </p>
            <p>
              A continuación puedes utilizar el buscador para encontrar el grupo
              que mejor se adapte a tu ubicación y horario.
            </p>
          </div>

        </div>
      </section>

      {/* Buscador */}
      <section className="pb-12 md:pb-16">

        <div className="mx-auto max-w-4xl px-6">
          <label className="block">
            <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.2em] text-brand/80">
              Buscar
            </span>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-brand/50"
                strokeWidth={1.8}
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ciudad o municipio, barrio o nombre del grupo"
                className="min-h-14 w-full rounded-full border border-brand/15 bg-paper pl-14 pr-6 text-base text-ink shadow-sm outline-none transition-colors placeholder:text-ink/50 focus:border-brand focus:ring-4 focus:ring-brand/15"
                aria-label="Buscar por ciudad, barrio o nombre del grupo"
              />
            </div>
          </label>

          {cities.length > 0 && (
            <p className="mt-4 text-sm text-ink/70">
              Sugerencias: {cities.join(" · ")}
            </p>
          )}
        </div>
      </section>

      {/* Resultados / directorio pendiente */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-4xl px-6">
          {placeholderGroups.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-brand/25 bg-paper/70 p-10 text-center md:p-14">
              <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.25em] text-brand/70">
                Directorio en preparación
              </span>
              <p className="font-serif text-2xl italic leading-snug text-brand md:text-3xl">
                El directorio oficial de grupos será incorporado en la próxima
                actualización.
              </p>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-ink/85">
                Estamos consolidando la información verificada de cada grupo
                (ubicación, horarios y contacto) para presentarla aquí de forma
                clara y confiable. Mientras tanto, si necesitas ayuda inmediata
                puedes escribirnos o llamarnos usando el botón de contacto.
              </p>
            </div>
          ) : (
            <>
              <p className="mb-8 text-sm font-semibold uppercase tracking-[0.15em] text-brand/70">
                {results.length} {results.length === 1 ? "grupo" : "grupos"}
              </p>
              {results.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-brand/20 bg-paper/60 p-10 text-center">
                  <p className="font-serif text-xl italic text-brand">
                    No encontramos grupos con esa búsqueda.
                  </p>
                  <p className="mt-3 text-ink/85">
                    Prueba con el nombre de tu ciudad, barrio o del grupo.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {results.map((g) => (
                    <GroupCard key={g.slug} g={g} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>


      {/* CTA primera reunión */}
      <section className="bg-brand py-20 text-paper">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.3em] text-paper/60">
            Para ti que llegas por primera vez
          </span>
          <h2 className="text-balance font-serif text-4xl italic leading-tight md:text-5xl">
            ¿Es tu primera reunión?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-paper/85">
            Conoce con calma qué sucede en una reunión de AA antes de asistir. Sin
            inscripciones, sin costo y con total respeto por tu anonimato.
          </p>
          <Link
            to="/necesito-ayuda"
            className="mt-10 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-paper px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-brand transition-colors hover:bg-paper/90"
          >
            Conocer mi primera reunión
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

function GroupCard({ g }: { g: PlaceholderGroup }) {
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    g.addressFull,
  )}`;
  const schedule = formatMeetings(g.meetings);

  return (
    <article className="flex flex-col rounded-3xl bg-paper p-7 shadow-soft ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-lift md:p-8">
      <span className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand/80">
        {g.city}
      </span>
      <h3 className="mb-4 font-serif text-2xl italic text-brand">{g.name}</h3>

      <p className="mb-5 flex items-start gap-2 text-sm text-ink/80">
        <MapPin className="mt-0.5 size-4 shrink-0 text-brand/70" strokeWidth={1.8} />
        <span>{g.addressLine}</span>
      </p>

      <ul className="mb-6 space-y-1.5 text-sm text-ink/85">
        {schedule.map((line) => (
          <li key={line} className="flex items-start gap-2">
            <Clock className="mt-0.5 size-4 shrink-0 text-brand/70" strokeWidth={1.8} />
            <span>{line}</span>
          </li>
        ))}
      </ul>

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
