import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import heroSalon from "@/assets/hero-salon-area2.jpg";
import caribeMap from "@/assets/caribe-map.jpg";
import eventosVideo from "@/assets/eventos-area2.mp4.asset.json";
import eventosPoster from "@/assets/eventos-poster.jpg.asset.json";
import { groupsQueryOptions } from "@/lib/groups-queries";
import type { Group } from "@/lib/groups-data";
import { listPublicEvents, type PublicEvent } from "@/lib/events.functions";
import {
  ArrowRight,
  MapPin,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
} from "lucide-react";
import type { ReactNode } from "react";
import logoAA from "@/assets/logo-aa.png.asset.json";
import { contactConfig, telLink, whatsappLink } from "@/lib/contact-config";


export const Route = createFileRoute("/")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(groupsQueryOptions());
    context.queryClient.ensureQueryData({
      queryKey: ["public", "events"],
      queryFn: () => listPublicEvents(),
    });
    return;
  },
  head: () => ({
    meta: [
      { title: "Alcohólicos Anónimos · Área 2 Metropolitana de Barranquilla" },
      {
        name: "description",
        content:
          "Si el alcohol está afectando tu vida, no estás solo. Encuentra reuniones de Alcohólicos Anónimos en Barranquilla, Soledad, Malambo, Galapa y Puerto Colombia.",
      },
      { property: "og:title", content: "Alcohólicos Anónimos · Área 2 Metropolitana de Barranquilla" },
      {
        property: "og:description",
        content:
          "Si el alcohol está afectando tu vida, no estás solo. Encuentra una reunión cerca de ti: sin inscripción, sin cuotas y con anonimato garantizado.",
      },
      { property: "og:url", content: "https://hope-finds-you-here.lovable.app/" },
      { property: "og:image", content: "https://hope-finds-you-here.lovable.app/og.jpg" },
      { name: "twitter:image", content: "https://hope-finds-you-here.lovable.app/og.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://hope-finds-you-here.lovable.app/" }],
  }),

  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl p-10 text-center text-ink/80">
      No pudimos cargar el contenido: {error.message}
    </div>
  ),
  component: Home,
});

type Door = {
  eyebrow: string;
  intro: string;
  to: string;
  cta: string;
};

const secondaryDoors: readonly Door[] = [
  {
    eyebrow: "Quiero cooperar",
    intro:
      "Si deseas conocer cómo Alcohólicos Anónimos coopera con profesionales, instituciones y la comunidad, este espacio es para ti.",
    to: "/contacto",
    cta: "Quiero cooperar",
  },
  {
    eyebrow: "Ya soy miembro",
    intro:
      "Acceso al portal privado con las credenciales entregadas por tu grupo o por el Área.",
    to: "/auth",
    cta: "Acceder al portal",
  },
  {
    eyebrow: "Conoce nuestra literatura",
    intro:
      "Libros y folletos oficiales de Alcohólicos Anónimos.",
    to: "/literatura",
    cta: "Explorar la literatura",
  },
  {
    eyebrow: "Noticias y eventos",
    intro:
      "Consulta las próximas actividades, encuentros y eventos del Área 2 Metropolitana.",
    to: "/eventos",
    cta: "Ver noticias y eventos",
  },
] as const;





function Home() {
  const { data: groups } = useSuspenseQuery(groupsQueryOptions());
  const callEvents = useServerFn(listPublicEvents);
  const { data: events } = useSuspenseQuery({
    queryKey: ["public", "events"],
    queryFn: () => callEvents(),
  });
  return <HomeContent groups={groups} events={events} />;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function HomeContent({ groups: _groups, events }: { groups: Group[]; events: PublicEvent[] }) {
  return (
    <>
      {/* 1. HERO */}
      <section className="relative overflow-hidden bg-soft">
        <img
          src={heroSalon}
          alt="Salón de reunión de Alcohólicos Anónimos: mesa redonda de madera con el Libro Grande, tazas de café y un termo; en la pared izquierda un cuadro con el logotipo de AA y el texto Alcohólicos Anónimos, Área 2 Metropolitana de Barranquilla, y en la pared derecha un cuadro con la Oración de la Serenidad"
          width={1920}
          height={1088}
          className="h-[30svh] w-full object-cover object-[50%_45%] sm:h-[36svh] md:h-[52svh] md:max-h-[520px]"
        />
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-l from-paper/95 via-paper/70 to-transparent md:block" />

        {/* Escritorio: bloque de texto sobre el tercio derecho, zona más limpia */}
        <div className="absolute inset-y-0 right-0 hidden w-full max-w-[36rem] flex-col justify-center px-10 text-left md:flex lg:px-14">
          <h1 className="mb-7 text-balance font-serif text-[2.3rem] font-bold leading-[1.12] text-brand-strong [text-shadow:0_1px_10px_rgba(255,255,255,0.9)] lg:text-[2.75rem]">
            ¿Crees que el alcohol está afectando tu vida?
          </h1>
          <p className="mb-11 max-w-[48ch] text-pretty text-base leading-[1.7] text-ink/90 [text-shadow:0_1px_6px_rgba(255,255,255,0.9)] lg:text-lg">
            En Alcohólicos Anónimos encontrarás una comunidad de personas que
            comparten su experiencia, fortaleza y esperanza. Si deseas dejar de
            beber, aquí encontrarás comprensión y un camino de recuperación.
          </p>
          <Link
            to="/necesito-ayuda"
            className="btn-aa w-fit uppercase tracking-[0.15em]"
          >
            Busco ayuda <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Móvil: composición propia, texto bajo la fotografía */}
        <div className="flex flex-col items-center px-6 pb-9 pt-7 text-center md:hidden">
          <h1 className="mb-4 text-balance font-serif text-[1.75rem] font-bold leading-[1.18] text-brand-strong">
            ¿Crees que el alcohol está afectando tu vida?
          </h1>
          <p className="mb-7 max-w-[38ch] text-pretty text-base leading-[1.65] text-ink/90">
            En Alcohólicos Anónimos encontrarás una comunidad de personas que
            comparten su experiencia, fortaleza y esperanza. Si deseas dejar de
            beber, aquí encontrarás comprensión y un camino de recuperación.
          </p>
          <Link
            to="/necesito-ayuda"
            className="btn-aa w-full max-w-xs uppercase tracking-[0.15em]"
          >
            Busco ayuda <ArrowRight className="size-4" />
          </Link>
        </div>


      </section>

      {/* 3. ENCUENTRA UN GRUPO */}
      <section className="bg-soft/50 py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span className="mb-5 block text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-brand">
            Encuentra un grupo
          </span>
          <h2 className="mb-6 font-serif text-3xl leading-[1.15] text-brand sm:text-4xl md:text-5xl">
            Da el primer paso
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-pretty text-lg leading-[1.7] text-ink/85">
            Encontrar un grupo es sencillo. No necesitas inscribirte, pedir
            autorización ni hablar si aún no lo deseas. Solo acércate a la
            reunión que mejor se adapte a ti.
          </p>
          <Link
            to="/grupos"
            className="btn-aa uppercase tracking-[0.15em]"
          >
            Encontrar un grupo <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* 3.5 CALENDARIO DE ASAMBLEAS Y EVENTOS */}
      <EventsSection events={events} />

      {/* 4-5-6. OTRAS PUERTAS */}
      <section className="border-t border-brand/5 bg-paper py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <ul
            role="list"
            className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {secondaryDoors.map((d) => (
              <li key={d.to} className="h-full">
                <Link
                  to={d.to}
                  className="flex h-full flex-col rounded-2xl border border-brand/10 bg-paper p-8 shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand/20 hover:bg-soft/40 hover:shadow-lift"
                >
                  <h2 className="mb-3 font-serif text-xl leading-[1.2] text-brand md:text-2xl">
                    {d.eyebrow}
                  </h2>
                  <p className="mb-8 text-[0.95rem] leading-[1.7] text-ink/85">
                    {d.intro}
                  </p>
                  <span className="btn-aa mt-auto w-full uppercase tracking-[0.08em]">
                    {d.cta} <ArrowRight className="size-4 transition-transform duration-300" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

        </div>
      </section>

      {/* 7. BIENVENIDO A NUESTRA OFICINA */}
      <section className="bg-soft/40 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-start gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <span className="mb-5 block text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-brand">
                La Oficina del Área
              </span>
              <h2 className="mb-6 font-serif text-3xl leading-[1.15] text-brand sm:text-4xl">
                Bienvenido a nuestra oficina
              </h2>
              <p className="max-w-prose text-pretty text-base leading-[1.7] text-ink/85">
                Este es un lugar de puertas abiertas para ti. Aquí encontrarás información,
                orientación y apoyo para tu recuperación y para el servicio a nuestra comunidad.
              </p>
              <p className="mt-6 border-l-2 border-brand/30 pl-5 font-serif text-lg italic leading-[1.6] text-brand">
                Siempre habrá una mano amiga y una puerta abierta.
              </p>
            </div>

            <ul role="list" className="grid gap-4 sm:grid-cols-2">
              <OfficeCard icon={<MapPin className="size-4" />} label="Dirección">
                <a
                  href={contactConfig.officeMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand underline underline-offset-4"
                >
                  {contactConfig.officeAddressLine1}, {contactConfig.officeAddressLine2},{" "}
                  {contactConfig.officeCity}
                </a>
              </OfficeCard>
              <OfficeCard icon={<Clock className="size-4" />} label="Horarios">
                Lunes a viernes
                <br />
                2:00 p. m. – 6:00 p. m.
              </OfficeCard>
              <OfficeCard icon={<Phone className="size-4" />} label="Teléfono">
                <a href={telLink()} className="text-brand underline underline-offset-4">
                  {contactConfig.phoneDisplay}
                </a>
              </OfficeCard>
              <OfficeCard icon={<MessageCircle className="size-4" />} label="WhatsApp">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand underline underline-offset-4"
                >
                  {contactConfig.phoneDisplay}
                </a>
              </OfficeCard>
              <OfficeCard icon={<Mail className="size-4" />} label="Correo electrónico">
                <a
                  href={`mailto:${contactConfig.email}`}
                  className="break-words text-brand underline underline-offset-4"
                >
                  {contactConfig.email}
                </a>
              </OfficeCard>
            </ul>
          </div>
        </div>
      </section>

      {/* 8. AA EN EL CARIBE */}
      <section id="caribe" className="border-t border-brand/5 bg-paper py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <div className="relative overflow-hidden rounded-2xl bg-soft/60 ring-1 ring-brand/10">
              <img
                src={caribeMap}
                alt="Mapa de la región Caribe colombiana, donde Alcohólicos Anónimos tiene presencia"
                width={1600}
                height={1000}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <img
                src={logoAA.url}
                alt=""
                aria-hidden
                className="absolute bottom-3 right-3 h-10 w-auto rounded-lg bg-paper/90 p-1 ring-1 ring-brand/10"
              />
            </div>
            <div>
              <span className="mb-5 block text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-brand">
                Presencia en el Caribe
              </span>
              <h2 className="mb-6 font-serif text-3xl leading-[1.15] text-brand sm:text-4xl">
                Conoce otros grupos en el Caribe colombiano
              </h2>
              <p className="text-pretty text-lg leading-[1.7] text-ink/85">
                El Área 2 Metropolitana forma parte de una comunidad más amplia de Alcohólicos
                Anónimos presente en toda la costa Caribe. Dondequiera que estés, es posible que
                haya un grupo cerca de ti. No estás solo, estamos juntos en este camino de
                recuperación.
              </p>
              <div className="mt-8">
                <Link to="/caribe" className="btn-aa w-full uppercase tracking-[0.12em] sm:w-auto">
                  Conoce otros grupos en el Caribe colombiano{" "}
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function EventsSection({ events }: { events: PublicEvent[] }) {
  const now = Date.now();
  const upcoming = events
    .filter((e) => new Date(e.endsAt ?? e.startsAt).getTime() >= now)
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())
    .slice(0, 3);

  return (
    <section className="bg-paper py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="mb-5 block text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-brand">
            Calendario de Asambleas y Eventos
          </span>
          <h2 className="mb-6 font-serif text-3xl leading-[1.15] text-brand sm:text-4xl md:text-5xl">
            Próximos eventos y actividades
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-[1.7] text-ink/85">
            Encuentra asambleas, foros, talleres y celebraciones del Área 2 Metropolitana.
          </p>
        </div>

        {upcoming.length > 0 && (
          <ul
            role="list"
            className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {upcoming.map((e) => (
              <li key={e.id}>
                <Link
                  to="/eventos/$slug"
                  params={{ slug: e.slug }}
                  className="card-aa flex h-full flex-col transition-all hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="mb-3 flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand/80">
                    <Calendar className="size-3.5" aria-hidden />
                    {fmtEventDate(e.startsAt)}
                  </div>
                  <h3 className="mb-2 font-serif text-lg leading-[1.25] text-brand">
                    {e.title}
                  </h3>
                  <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-ink/75">
                    {e.location ?? e.municipalityName ?? "Área 2 Metropolitana"}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                    Ver detalles <ArrowRight className="size-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-2xl bg-soft/60 ring-1 ring-brand/10">
            <video
              src={eventosVideo.url}
              poster={eventosPoster.url}
              controls
              preload="metadata"
              playsInline
              className="aspect-video w-full bg-soft"
              aria-label="Video de asambleas y eventos del Área 2 Metropolitana"
            >
              Tu navegador no soporta la reproducción de video. Puedes{" "}
              <a href={eventosVideo.url} className="text-brand underline">
                descargar el video
              </a>{" "}
              directamente.
            </video>
          </div>
          <p className="mt-3 text-center text-xs text-ink/60">
            El video se reproduce solo cuando presionas el botón de play.
          </p>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/eventos"
            className="btn-aa uppercase tracking-[0.15em]"
          >
            Ver calendario completo <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function fmtEventDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function OfficeCard({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <li className="card-aa">
      <span className="mb-3 grid size-9 place-items-center rounded-full bg-brand/10 text-brand">
        {icon}
      </span>
      <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand/80">
        {label}
      </span>
      <p className="mt-2 text-sm leading-relaxed text-ink/85">{children}</p>
    </li>
  );
}

