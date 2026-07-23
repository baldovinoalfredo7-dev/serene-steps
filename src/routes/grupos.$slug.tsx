import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Clock, ImageIcon, MapPin, Navigation, Phone } from "lucide-react";
import { groupsQueryOptions, findGroupBySlug } from "@/lib/groups-queries";
import { weekdayLabels, weekdayShort } from "@/lib/groups-data";

export const Route = createFileRoute("/grupos/$slug")({
  loader: async ({ context, params }) => {
    const groups = await context.queryClient.ensureQueryData(groupsQueryOptions());
    const group = findGroupBySlug(groups, params.slug);
    if (!group) throw notFound();
    return {
      slug: params.slug,
      name: group.name,
      municipality: group.municipality,
      addressLine: group.addressLine,
    };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Grupo no encontrado" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${loaderData.name} — ${loaderData.municipality}`;
    const desc = `Horarios, dirección y cómo llegar al ${loaderData.name} en ${loaderData.addressLine}.`;
    const url = `/grupos/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl p-16 text-center">
      <h1 className="mb-4 font-serif text-3xl text-brand">Grupo no encontrado</h1>
      <Link to="/grupos" className="text-brand underline">
        Volver al buscador
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl p-10 text-center text-ink/80">
      No pudimos cargar el grupo: {error.message}
    </div>
  ),
  component: GroupDetail,
});

function GroupDetail() {
  const { slug } = Route.useLoaderData();
  const { data: groups } = useSuspenseQuery(groupsQueryOptions());
  const group = findGroupBySlug(groups, slug)!;

  const mapsQuery = encodeURIComponent(group.addressFull);
  const mapEmbedSrc = `https://www.google.com/maps?q=${mapsQuery}&z=15&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;

  const meetingsByDay = Array.from({ length: 7 }, (_, day) =>
    group.meetings
      .filter((m) => m.weekday === day)
      .sort((a, b) => a.start.localeCompare(b.start)),
  );

  const orderedMeetings = group.meetings
    .slice()
    .sort((a, b) => a.weekday - b.weekday || a.start.localeCompare(b.start));

  return (
    <>
      {/* Encabezado */}
      <section className="border-b border-brand/5 bg-soft/40 py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            to="/grupos"
            className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand/80 hover:text-brand"
          >
            <ArrowLeft className="size-3.5" />
            Todos los grupos
          </Link>
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-brand/80">
            {group.municipality}
          </span>
          <h1 className="max-w-3xl text-balance font-serif text-4xl italic leading-tight text-brand md:text-6xl">
            {group.name}
          </h1>
          <p className="mt-6 flex items-center gap-2 text-lg text-ink/85">
            <MapPin className="size-5 text-brand/80" />
            {group.addressFull}
          </p>
        </div>
      </section>

      {/* Contenido */}
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <div>
              <h2 className="mb-6 font-serif text-2xl italic text-brand">El lugar</h2>
              <div className="flex aspect-[16/9] w-full items-center justify-center rounded-2xl bg-soft/70 ring-1 ring-black/5">
                <div className="flex flex-col items-center gap-3 text-brand/50">
                  <ImageIcon className="size-10" strokeWidth={1.4} />
                  <span className="text-xs font-medium uppercase tracking-widest">
                    Fotografía del lugar
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-6 font-serif text-2xl italic text-brand">Calendario semanal</h2>
              <div className="overflow-hidden rounded-2xl ring-1 ring-black/5">
                <div className="grid grid-cols-7 divide-x divide-brand/5 bg-paper">
                  {weekdayShort.map((short, i) => {
                    const dayMeetings = meetingsByDay[i];
                    const hasMeetings = dayMeetings.length > 0;
                    return (
                      <div
                        key={short}
                        className={
                          "flex min-h-[130px] flex-col p-3 " +
                          (hasMeetings ? "bg-paper" : "bg-soft/40")
                        }
                      >
                        <span
                          className={
                            "mb-3 text-center text-[10px] font-bold uppercase tracking-widest " +
                            (hasMeetings ? "text-brand" : "text-ink/30")
                          }
                        >
                          {short}
                        </span>
                        <div className="space-y-2">
                          {dayMeetings.map((m, idx) => (
                            <div
                              key={idx}
                              className="rounded-md bg-brand/5 px-2 py-1.5 text-center"
                            >
                              <div className="text-[11px] font-semibold text-brand">
                                {m.start}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-6 font-serif text-2xl italic text-brand">Horarios de reunión</h2>
              <ul className="divide-y divide-brand/5 rounded-2xl bg-paper ring-1 ring-black/5">
                {orderedMeetings.map((m, idx) => (
                  <li key={idx} className="flex items-center justify-between gap-4 px-6 py-4">
                    <div className="font-semibold text-brand">
                      {weekdayLabels[m.weekday]}
                    </div>
                    <div className="flex items-center gap-2 text-brand">
                      <Clock className="size-4 text-brand/80" />
                      <span className="font-mono text-sm tabular-nums">
                        {m.start} – {m.end}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-6 font-serif text-2xl italic text-brand">Cómo llegar</h2>
              <p className="max-w-[65ch] text-pretty text-base leading-relaxed text-ink/85">
                El grupo se encuentra en {group.addressFull}. Puedes abrir la ruta directamente
                en Google Maps con el botón de la derecha, o llamar al número de contacto si
                necesitas orientación adicional para llegar.
              </p>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-2xl ring-1 ring-black/5">
              <iframe
                title={`Ubicación de ${group.name}`}
                src={mapEmbedSrc}
                className="aspect-square w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="rounded-2xl bg-paper p-6 ring-1 ring-black/5">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-brand/80">
                Dirección
              </span>
              <p className="mb-6 text-sm text-ink/85">{group.addressFull}</p>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-paper shadow-md shadow-brand/20 transition-colors hover:bg-brand/90"
              >
                <Navigation className="size-4" />
                Abrir en Google Maps
              </a>

              {group.phone ? (
                <a
                  href={`tel:${group.phone.replace(/\s/g, "")}`}
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-brand/20 px-5 py-3 text-sm font-medium text-brand transition-colors hover:bg-soft"
                >
                  <Phone className="size-4" />
                  {group.phone}
                </a>
              ) : (
                <p className="rounded-2xl bg-soft/60 px-4 py-3 text-center text-xs text-ink/60">
                  Teléfono de contacto por confirmar con el Área.
                </p>
              )}
            </div>
          </aside>
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
            Antes de asistir, conoce con calma qué esperar de una reunión de AA. Es sencillo,
            confidencial y siempre serás bienvenido.
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
