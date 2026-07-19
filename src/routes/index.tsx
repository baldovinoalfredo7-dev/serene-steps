import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import heroImage from "@/assets/hero-room.jpg";
import queEsAAImage from "@/assets/que-es-aa.jpg";
import { groupsQueryOptions } from "@/lib/groups-queries";
import { MeetingFinder } from "@/components/site/MeetingFinder";
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  Clock,
  Ear,
  HandHeart,
  MapPin,
  Sparkles,
  Trophy,
  UsersRound,
  ShieldCheck,
  Wallet,
  ClipboardX,
  CalendarCheck,
  LifeBuoy,
} from "lucide-react";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(groupsQueryOptions()),
  head: () => ({
    meta: [
      { property: "og:image", content: "https://project--b2ac4377-59f2-46ea-a581-d53e687bd969.lovable.app/og.jpg" },
    ],
  }),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl p-10 text-center text-ink/80">
      No pudimos cargar el contenido: {error.message}
    </div>
  ),
  component: Home,
});

function Home() {
  const { data: groups } = useSuspenseQuery(groupsQueryOptions());
  return HomeContent({ groups });
}

function HomeContent({ groups }: { groups: import("@/lib/groups-data").Group[] }) {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[calc(100svh-5rem)] overflow-hidden bg-soft md:min-h-[calc(100svh-6rem)]">
        <img
          src={heroImage}
          alt="Sala luminosa preparada para una reunión de AA con sillas en círculo"
          width={1600}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Superposición sutil para mejorar el contraste sin oscurecer la imagen */}
        <div className="absolute inset-0 bg-gradient-to-b from-paper/85 via-paper/60 to-paper/90" />
        <div className="absolute inset-0 bg-brand/20" />

        <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-6xl flex-col items-center justify-center px-6 py-10 pb-24 text-center md:min-h-[calc(100svh-6rem)] md:py-20 md:pb-20">
          <h1 className="mb-3 max-w-5xl text-balance font-serif text-[2rem] leading-[1.05] text-brand sm:mb-5 sm:text-6xl lg:text-[4.75rem]">
            Alcohólicos Anónimos
          </h1>
          <p className="mb-6 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-brand/90 sm:mb-10 sm:text-base sm:tracking-[0.3em]">
            Área 2 Metropolitana – Barranquilla
          </p>
          <p className="mb-4 max-w-3xl text-pretty font-serif text-lg italic leading-snug text-brand sm:mb-6 sm:text-3xl lg:text-4xl">
            La ayuda está más cerca de lo que imaginas.
          </p>
          <p className="mb-7 max-w-2xl text-pretty text-sm leading-relaxed text-ink/85 sm:mb-14 sm:text-lg">
            Una comunidad de hombres y mujeres que comparten su experiencia,
            fortaleza y esperanza.
          </p>


          <Link
            to="/grupos"
            className="group relative inline-flex min-h-14 items-center gap-3 rounded-full bg-brand px-8 py-5 text-sm font-semibold uppercase tracking-[0.18em] text-paper shadow-lift ring-1 ring-brand/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-soft hover:shadow-[0_28px_60px_-18px_color-mix(in_oklab,var(--brand)_45%,transparent)] focus-visible:ring-4 focus-visible:ring-brand/30 sm:min-h-16 sm:gap-4 sm:px-16 sm:py-8 sm:text-xl"
          >
            <MapPin className="size-5 sm:size-7" strokeWidth={2} />
            Encuentra un grupo
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1 sm:size-7" />
          </Link>

          <Link
            to="/auth"
            className="mt-5 inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-brand/70 underline-offset-4 transition-colors hover:text-brand hover:underline sm:mt-6 sm:text-sm"
          >
            Acceso para miembros
            <ArrowRight className="size-3.5" />
          </Link>

          <ul className="mt-8 grid w-full max-w-4xl grid-cols-2 gap-x-4 gap-y-4 sm:mt-14 sm:grid-cols-4 sm:gap-8">
            {heroBadges.map((b) => (
              <li key={b.label} className="flex flex-col items-center gap-2 text-center sm:gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-paper/80 ring-1 ring-brand/15 shadow-soft backdrop-blur-sm sm:size-12">
                  <b.icon className="size-4 text-brand sm:size-5" strokeWidth={1.8} />
                </span>
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-brand/90 sm:text-sm sm:tracking-[0.15em]">
                  {b.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>


      {/* ¿QUÉ ES ALCOHÓLICOS ANÓNIMOS? */}
      {/* ¿CÓMO PODEMOS AYUDARTE? — 3 rutas prioritarias, acción antes que información */}
      <section
        aria-labelledby="ayuda-heading"
        className="bg-paper py-20 md:py-28"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-brand">
              Empieza aquí
            </span>
            <h2
              id="ayuda-heading"
              className="font-serif text-4xl italic text-brand md:text-5xl lg:text-6xl"
            >
              ¿Cómo podemos ayudarte?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-ink/85 md:text-lg">
              Elige el camino que mejor te describe. Cada uno te lleva a la
              información y contacto que necesitas.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 sm:gap-8 md:grid-cols-3">
            {helpCards.map((c) => (
              <Link
                key={c.title}
                to={c.to}
                className="group flex flex-col rounded-3xl bg-soft/70 p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:bg-brand hover:text-paper hover:shadow-lift md:p-10"
              >
                <div className="mb-6 grid size-14 place-items-center rounded-2xl bg-brand/10 transition-colors group-hover:bg-paper/15">
                  <c.icon
                    className="size-7 text-brand transition-colors group-hover:text-paper"
                    strokeWidth={1.6}
                  />
                </div>
                <h3 className="mb-3 font-serif text-2xl italic text-brand transition-colors group-hover:text-paper md:text-3xl">
                  {c.title}
                </h3>
                <p className="mb-8 text-pretty leading-relaxed text-ink/85 transition-colors group-hover:text-paper/90">
                  {c.body}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-brand transition-colors group-hover:text-paper">
                  {c.cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NECESITO UNA REUNIÓN HOY — acción principal para quien busca ayuda */}
      <MeetingFinder groups={groups} />

      {/* ¿QUÉ ES ALCOHÓLICOS ANÓNIMOS? — contexto institucional, después de la acción */}
      <section
        aria-labelledby="que-es-aa-heading"
        className="bg-soft/40 py-20 md:py-28"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <div className="order-2 md:order-1">
              <div className="overflow-hidden rounded-3xl shadow-soft">
                <img
                  src={queEsAAImage}
                  alt="Sala de reunión de Alcohólicos Anónimos con personas de espaldas sentadas en círculo"
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-brand">
                Sobre nosotros
              </span>
              <h2
                id="que-es-aa-heading"
                className="mb-6 font-serif text-4xl italic leading-tight text-brand md:text-5xl lg:text-6xl"
              >
                ¿Qué es Alcohólicos Anónimos?
              </h2>
              <p className="mb-10 text-pretty text-lg leading-relaxed text-ink/85 md:text-xl">
                Alcohólicos Anónimos es una comunidad de hombres y mujeres que
                comparten su experiencia, fortaleza y esperanza para resolver su
                problema común y ayudar a otros a recuperarse del alcoholismo.
              </p>
              <Link
                to="/que-es-aa"
                className="inline-flex min-h-14 items-center gap-3 rounded-full bg-brand px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-paper shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-soft hover:shadow-lift focus-visible:ring-4 focus-visible:ring-brand/30"
              >
                Conoce más
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>



      {/* ENCUENTRA UN GRUPO */}
      <section className="bg-soft/60 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-brand">
                Directorio del Área 2
              </span>
              <h2 className="mb-4 font-serif text-4xl italic text-brand md:text-5xl lg:text-6xl">
                Encuentra un grupo
              </h2>
              <p className="max-w-xl text-lg leading-relaxed text-ink/85">
                Nueve grupos abiertos, en distintos municipios del Área 2 Metropolitana.
              </p>
            </div>
            <Link
              to="/grupos"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-brand/25 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-brand transition-colors hover:bg-brand hover:text-paper"
            >
              Ver directorio completo <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((g) => (
              <GroupCard
                key={g.slug}
                slug={g.slug}
                name={g.name}
                municipality={g.municipality}
                schedule={mainSchedule(g.meetings)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PRIMERA REUNIÓN — información acogedora para quien nunca ha ido */}
      <section
        aria-labelledby="primera-reunion-heading"
        className="bg-paper py-20 md:py-28"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-brand">
              Para tu primera vez
            </span>
            <h2
              id="primera-reunion-heading"
              className="text-balance font-serif text-4xl italic text-brand md:text-5xl lg:text-6xl"
            >
              ¿Qué puedes esperar de tu primera reunión?
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {firstMeetingItems.map((item) => (
              <div
                key={item.title}
                className="flex flex-col rounded-3xl bg-soft/60 p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift md:p-10"
              >
                <div className="mb-6 grid size-14 place-items-center rounded-2xl bg-brand/10">
                  <item.icon className="size-7 text-brand" strokeWidth={1.6} />
                </div>
                <h4 className="mb-3 font-serif text-xl italic text-brand md:text-2xl">
                  {item.title}
                </h4>
                <p className="text-pretty leading-relaxed text-ink/85">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/primera-reunion"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-brand/25 px-7 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-brand transition-colors hover:bg-brand hover:text-paper"
            >
              Leer más sobre tu primera reunión
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PRÓXIMOS EVENTOS */}
      <section
        aria-labelledby="eventos-heading"
        className="bg-soft/60 py-20 md:py-28"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-brand">
                Calendario del Área
              </span>
              <h2
                id="eventos-heading"
                className="mb-4 font-serif text-4xl italic text-brand md:text-5xl lg:text-6xl"
              >
                Próximos eventos
              </h2>
              <p className="max-w-xl text-lg leading-relaxed text-ink/85">
                Espacios abiertos para reforzar la unidad, la experiencia y el servicio.
              </p>
            </div>
            <Link
              to="/eventos"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-brand/25 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-brand transition-colors hover:bg-brand hover:text-paper"
            >
              Ver todos los eventos <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {eventCards.map((e) => (
              <article
                key={e.title}
                className="flex flex-col rounded-3xl bg-paper p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift md:p-10"
              >
                <div className="mb-6 grid size-14 place-items-center rounded-2xl bg-brand/10">
                  <e.icon className="size-7 text-brand" strokeWidth={1.6} />
                </div>
                <span className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                  {e.tag}
                </span>
                <h3 className="mb-3 font-serif text-2xl italic text-brand md:text-3xl">
                  {e.title}
                </h3>
                <p className="mb-8 text-pretty leading-relaxed text-ink/85">
                  {e.body}
                </p>
                <Link
                  to="/eventos"
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-brand"
                >
                  Ver calendario <ArrowRight className="size-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* TESTIMONIOS */}
      <section className="bg-brand py-20 text-paper md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-paper/50">
              Testimonios anónimos
            </span>
            <h2 className="font-serif text-3xl italic text-paper md:text-4xl">
              Voces de esperanza
            </h2>
          </div>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <blockquote className="border-l border-paper/15 pl-8">
              <p className="mb-6 text-pretty font-serif text-2xl italic leading-tight">
                "Llegué con miedo y mucha vergüenza, pensando que sería juzgado. Encontré un lugar
                donde por primera vez en años me sentí comprendido sin mediar palabras."
              </p>
              <cite className="text-sm font-medium not-italic opacity-60">
                — Miembro de AA, 4 años de sobriedad
              </cite>
            </blockquote>
            <blockquote className="border-l border-paper/15 pl-8">
              <p className="mb-6 text-pretty font-serif text-2xl italic leading-tight">
                "No sabía que existía una solución tan sencilla. No se trata de religión, se trata
                de comunidad y de entender que solo por hoy podemos estar bien."
              </p>
              <cite className="text-sm font-medium not-italic opacity-60">
                — Miembro de AA, Área 2 Metropolitana
              </cite>
            </blockquote>
          </div>
          <div className="mt-12">
            <Link
              to="/testimonios"
              className="inline-flex items-center gap-2 border-b border-paper/30 pb-1 text-sm font-medium text-paper hover:border-paper"
            >
              Leer más testimonios
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ACCESO PARA MIEMBROS */}
      <section className="border-t border-brand/10 bg-soft/60 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex flex-col items-center gap-6 rounded-3xl bg-paper p-10 text-center shadow-soft md:flex-row md:items-center md:justify-between md:gap-10 md:p-12 md:text-left">
            <div className="flex-1">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-brand">
                Área de servicio
              </span>
              <h2 className="mb-3 font-serif text-2xl italic text-brand md:text-3xl">
                ¿Eres miembro de Alcohólicos Anónimos?
              </h2>
              <p className="text-pretty leading-relaxed text-ink/85">
                Ingresa con tu correo electrónico para acceder a herramientas de
                servicio, gestionar tu grupo, publicar eventos y coordinar el
                trabajo del Área.
              </p>
            </div>
            <Link
              to="/auth"
              className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full border border-brand/25 px-7 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-brand transition-colors hover:bg-brand hover:text-paper"
            >
              Acceso para miembros
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function GroupCard({
  slug,
  name,
  municipality,
  schedule,
}: {
  slug: string;
  name: string;
  municipality: string;
  schedule: string;
}) {
  return (
    <div className="group flex flex-col rounded-3xl bg-paper p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <span className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
        {municipality}
      </span>
      <h3 className="mb-4 font-serif text-2xl italic text-brand">{name}</h3>
      <div className="mb-8 flex items-center gap-2 text-sm text-ink/85">
        <Clock className="size-4 text-brand/80" strokeWidth={1.8} />
        <span>{schedule}</span>
      </div>
      <Link
        to="/grupos/$slug"
        params={{ slug }}
        className="mt-auto inline-flex min-h-12 items-center justify-between gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-paper transition-all hover:bg-brand/90"
      >
        Ver información
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

function mainSchedule(meetings: { weekday: number; start: string; end: string }[]) {
  if (!meetings.length) return "Consultar horario";
  const sample = meetings[0];
  const days = new Set(meetings.map((m) => m.weekday)).size;
  return `${days} día${days > 1 ? "s" : ""} · ${sample.start}–${sample.end} h`;
}

const heroBadges = [
  { label: "Sin inscripción", icon: ClipboardX },
  { label: "Sin cuotas para asistir", icon: Wallet },
  { label: "Anonimato", icon: ShieldCheck },
  { label: "Reuniones todos los días", icon: CalendarCheck },
] as const;

const helpCards = [
  {
    title: "Busco ayuda",
    body: "Para mí o para un familiar. Encuentra una reunión hoy, entiende qué es AA y da tu primer paso con acompañamiento.",
    cta: "Empezar",
    to: "/grupos",
    icon: LifeBuoy,
  },
  {
    title: "Ya soy miembro de AA",
    body: "Accede al Área de Servicio con tu correo. Gestiona tu grupo, publica eventos y coordina el trabajo del Área.",
    cta: "Acceso para miembros",
    to: "/auth",
    icon: ShieldCheck,
  },
  {
    title: "Soy profesional o institución",
    body: "Salud, justicia, educación o comunidad. Coordina con Información Pública para orientar a personas que puedan necesitar AA.",
    cta: "Información Pública",
    to: "/contacto",
    icon: Briefcase,
  },
] as const;

const eventCards = [
  {
    tag: "Foros",
    title: "Foros de compartimiento",
    body: "Espacios abiertos donde miembros comparten su experiencia, fortaleza y esperanza.",
    icon: UsersRound,
  },
  {
    tag: "Congresos",
    title: "Congresos y convenciones",
    body: "Encuentros regionales para fortalecer la unidad y el mensaje de recuperación.",
    icon: CalendarDays,
  },
  {
    tag: "Aniversarios",
    title: "Aniversarios de grupo",
    body: "Celebraciones donde miembros comparten sus años de sobriedad con la comunidad.",
    icon: Trophy,
  },
];

const firstMeetingItems = [
  {
    title: "No necesitas inscribirte",
    body: "Simplemente llega a la dirección indicada. No hay papeleo ni requisitos previos.",
    icon: ClipboardX,
  },
  {
    title: "Puedes solamente escuchar",
    body: "No estás obligado a hablar ni a presentarte. Puedes asistir solo a escuchar.",
    icon: Ear,
  },
  {
    title: "No hay cuotas para asistir",
    body: "AA se sostiene con contribuciones voluntarias de sus miembros. Asistir es gratuito.",
    icon: Wallet,
  },
  {
    title: "Se respeta el anonimato",
    body: "Lo que se dice en la reunión se queda en la reunión. Tu privacidad es prioridad.",
    icon: ShieldCheck,
  },
  {
    title: "Encontrarás personas con experiencias similares",
    body: "Hombres y mujeres que han vivido lo mismo y hoy comparten su camino con serenidad.",
    icon: HandHeart,
  },
  {
    title: "Siempre serás bienvenido",
    body: "No importa tu historia, tu edad o de dónde vengas: aquí hay un lugar para ti.",
    icon: Sparkles,
  },
];
