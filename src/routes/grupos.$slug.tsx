import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Navigation, Phone, Clock, Coffee, DoorOpen, Sofa, Heart } from "lucide-react";
import {
  getGroupBySlug,
  weekdayLabels,
  weekdayShort,
  meetingTypeLabel,
  groups,
  type Group,
  type Meeting,
} from "@/lib/groups-data";

export const Route = createFileRoute("/grupos/$slug")({
  loader: ({ params }) => {
    const group = getGroupBySlug(params.slug);
    if (!group) throw notFound();
    return { group };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Grupo no encontrado — AA Área 2" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { group } = loaderData;
    const title = `${group.name} — ${group.municipality} · AA Área 2`;
    const desc = `Reuniones de Alcohólicos Anónimos en ${group.addressLine}, ${group.municipality}.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: GroupDetail,
});

function GroupDetail() {
  const { group } = Route.useLoaderData() as { group: Group };

  const mapsQuery = encodeURIComponent(group.addressFull);
  const mapEmbedSrc = `https://www.google.com/maps?q=${mapsQuery}&z=15&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${group.lat},${group.lng}`;

  const meetingsByDay = Array.from({ length: 7 }, (_, day) =>
    group.meetings.filter((m) => m.weekday === day).sort((a, b) => a.start.localeCompare(b.start)),
  );

  return (
    <>
      {/* Header */}
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
            {group.addressLine}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-3">
          {/* Left: info */}
          <div className="space-y-10 lg:col-span-2">
            {/* Calendario semanal */}
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
                          "flex min-h-[140px] flex-col p-3 " +
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
                              title={meetingTypeLabel[m.type]}
                            >
                              <div className="text-[11px] font-semibold text-brand">
                                {m.start}
                              </div>
                              <div className="text-[9px] uppercase tracking-wide text-brand/80">
                                {m.type}
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

            {/* Horarios detallados */}
            <div>
              <h2 className="mb-6 font-serif text-2xl italic text-brand">Horarios de reunión</h2>
              <ul className="divide-y divide-brand/5 rounded-2xl bg-paper ring-1 ring-black/5">
                {group.meetings
                  .slice()
                  .sort((a, b) => a.weekday - b.weekday || a.start.localeCompare(b.start))
                  .map((m: Meeting, idx) => (
                    <li key={idx} className="flex items-center justify-between gap-4 px-6 py-4">
                      <div>
                        <div className="font-semibold text-brand">
                          {weekdayLabels[m.weekday]}
                        </div>
                        <div className="text-sm text-ink/80">{meetingTypeLabel[m.type]}</div>
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

            {/* Historia */}
            <div>
              <h2 className="mb-6 font-serif text-2xl italic text-brand">Sobre este grupo</h2>
              <p className="max-w-[65ch] text-pretty text-lg leading-relaxed text-ink/85">
                {group.history}
              </p>
            </div>

            {/* Fotografías del salón */}
            <div>
              <h2 className="mb-6 font-serif text-2xl italic text-brand">El salón</h2>
              <p className="mb-6 max-w-[60ch] text-sm text-ink/80">
                Un espacio sencillo, tranquilo y preparado para recibirte. Sin cámaras, sin
                nombres, sin exposición.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { icon: Sofa, label: "Sala principal" },
                  { icon: DoorOpen, label: "Entrada del grupo" },
                  { icon: Coffee, label: "Rincón del café" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-2xl bg-soft/60 p-6 text-center ring-1 ring-black/5"
                  >
                    <Icon className="size-8 text-brand/40" strokeWidth={1.5} />
                    <span className="text-xs font-medium uppercase tracking-widest text-brand/80">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: mapa + contacto */}
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
              <p className="mb-6 text-sm text-ink/80">{group.addressFull}</p>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-3 flex w-full items-center justify-center gap-2 rounded-sm bg-brand px-5 py-3 text-sm font-semibold text-paper shadow-md shadow-brand/20 transition-colors hover:bg-brand/90"
              >
                <Navigation className="size-4" />
                Cómo llegar
              </a>

              {group.phone && (
                <a
                  href={`tel:${group.phone.replace(/\s/g, "")}`}
                  className="flex w-full items-center justify-center gap-2 rounded-sm border border-brand/20 px-5 py-3 text-sm font-medium text-brand transition-colors hover:bg-soft"
                >
                  <Phone className="size-4" />
                  {group.phone}
                </a>
              )}
            </div>

            {group.publicInfo && (
              <div className="rounded-2xl bg-paper p-6 ring-1 ring-black/5">
                <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-brand/80">
                  Información pública
                </span>
                {group.publicInfo.name && (
                  <p className="mb-2 text-sm font-medium text-brand">{group.publicInfo.name}</p>
                )}
                {group.publicInfo.phone && (
                  <a
                    href={`tel:${group.publicInfo.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 text-sm text-ink/85 hover:text-brand"
                  >
                    <Phone className="size-3.5 text-brand/80" />
                    {group.publicInfo.phone}
                  </a>
                )}
                {group.publicInfo.email && (
                  <a
                    href={`mailto:${group.publicInfo.email}`}
                    className="mt-1 block text-sm text-ink/85 hover:text-brand"
                  >
                    {group.publicInfo.email}
                  </a>
                )}
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* ¿Es tu primera reunión? */}
      <section className="bg-brand py-20 text-paper">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Heart className="mx-auto mb-6 size-8 text-paper/50" strokeWidth={1.5} />
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.3em] text-paper/60">
            Para ti que llegas por primera vez
          </span>
          <h2 className="text-balance font-serif text-4xl italic leading-tight md:text-5xl">
            ¿Es tu primera reunión?
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-paper/85">
            Puedes asistir sin inscribirte. Si lo deseas, puedes simplemente escuchar. Se respeta
            el anonimato y siempre serás bienvenido.
          </p>
          <Link
            to="/primera-reunion"
            className="mt-10 inline-flex items-center gap-2 border-b border-paper/40 pb-1 text-sm font-medium uppercase tracking-widest hover:border-paper"
          >
            Qué esperar de tu primera reunión →
          </Link>
        </div>
      </section>


      {/* Otros grupos */}
      <section className="border-t border-brand/5 bg-soft/40 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-8 font-serif text-2xl italic text-brand">Otros grupos cercanos</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {groups
              .filter((g) => g.slug !== group.slug)
              .slice(0, 3)
              .map((g) => (
                <Link
                  key={g.slug}
                  to="/grupos/$slug"
                  params={{ slug: g.slug }}
                  className="rounded-2xl bg-paper p-6 ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:ring-brand/20"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-brand/40">
                    {g.municipality}
                  </span>
                  <h3 className="mt-2 font-serif text-lg text-brand">{g.name}</h3>
                  <p className="mt-1 text-sm text-ink/80">{g.addressLine}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
