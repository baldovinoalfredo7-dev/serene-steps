import { createFileRoute, Link } from "@tanstack/react-router";
import heroImage from "@/assets/hero-room.jpg";
import { groups } from "@/lib/groups-data";
import { ArrowRight, Clock, HeartHandshake, MapPin, Users } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:image", content: "https://project--b2ac4377-59f2-46ea-a581-d53e687bd969.lovable.app/og.jpg" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO — casi pantalla completa */}
      <section className="relative min-h-[calc(100svh-4rem)] overflow-hidden bg-brand text-paper">
        <img
          src={heroImage}
          alt="Sala preparada para una reunión de AA con sillas en círculo"
          width={1408}
          height={1600}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand/70 via-brand/60 to-brand/90" />
        <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl flex-col items-center justify-center px-6 py-16 text-center">
          <span className="mb-6 block text-xs font-semibold uppercase tracking-[0.3em] text-paper/70">
            Alcohólicos Anónimos · Área 2 Metropolitana
          </span>
          <h1 className="mb-8 max-w-4xl text-balance font-serif text-4xl italic leading-[1.05] text-paper sm:text-5xl lg:text-7xl">
            La ayuda está más cerca de lo que imaginas.
          </h1>
          <p className="mb-12 max-w-2xl text-pretty text-lg text-paper/80 sm:text-xl">
            Si el alcohol está afectando tu vida o la de alguien que amas, no estás solo.
            Aquí puedes dar el primer paso, con calma y en total anonimato.
          </p>

          {/* CTA principal — el elemento más importante */}
          <Link
            to="/grupos"
            className="group relative inline-flex items-center gap-4 rounded-md bg-paper px-10 py-6 text-lg font-semibold uppercase tracking-wider text-brand shadow-2xl shadow-black/30 ring-2 ring-paper transition-all hover:-translate-y-1 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] sm:px-14 sm:py-7 sm:text-xl"
          >
            <MapPin className="size-6" />
            Encuentra un grupo
            <ArrowRight className="size-6 transition-transform group-hover:translate-x-1" />
          </Link>

          <p className="mt-10 text-sm text-paper/60">
            Sin inscripción · Sin cuotas · Anonimato garantizado
          </p>
        </div>
      </section>

      {/* ¿CÓMO PODEMOS AYUDARTE? */}
      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-brand/60">
              Empieza aquí
            </span>
            <h2 className="font-serif text-3xl italic text-brand md:text-5xl">
              ¿Cómo podemos ayudarte?
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {helpCards.map((c) => (
              <Link
                key={c.title}
                to={c.to}
                className="group flex flex-col rounded-2xl bg-soft p-8 ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:bg-brand hover:text-paper hover:ring-brand"
              >
                <c.icon className="mb-6 size-9 text-brand transition-colors group-hover:text-paper" />
                <h3 className="mb-3 font-serif text-2xl italic text-brand transition-colors group-hover:text-paper">
                  {c.title}
                </h3>
                <p className="mb-8 text-pretty text-ink/60 transition-colors group-hover:text-paper/80">
                  {c.body}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand transition-colors group-hover:text-paper">
                  {c.cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ENCUENTRA UN GRUPO — 9 tarjetas */}
      <section className="bg-soft/60 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-brand/60">
                Directorio del Área 2
              </span>
              <h2 className="mb-4 font-serif text-3xl italic text-brand md:text-5xl">
                Encuentra un grupo
              </h2>
              <p className="max-w-xl text-ink/60">
                Nueve grupos abiertos, en distintos municipios del Área 2 Metropolitana.
              </p>
            </div>
            <Link
              to="/grupos"
              className="inline-flex items-center gap-2 rounded-sm border border-brand/20 px-5 py-3 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-paper"
            >
              Ver directorio completo <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((g) => (
              <GroupCard key={g.slug} slug={g.slug} name={g.name} municipality={g.municipality} schedule={mainSchedule(g.meetings)} />
            ))}
          </div>
        </div>
      </section>

      {/* PRIMERA REUNIÓN */}
      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-14 text-center">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-brand/60">
              Para tu primera vez
            </span>
            <h2 className="text-balance font-serif text-3xl italic text-brand md:text-5xl">
              ¿Qué puedes esperar de tu primera reunión?
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {firstMeetingItems.map((item, i) => (
              <div key={item.title} className="flex gap-5 rounded-2xl bg-soft/60 p-8 ring-1 ring-black/5">
                <span className="font-serif text-4xl italic text-brand/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="mb-2 font-serif text-xl text-brand">{item.title}</h4>
                  <p className="text-pretty text-ink/60">{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/primera-reunion"
              className="inline-flex items-center gap-2 rounded-sm border border-brand/20 px-6 py-3 text-sm font-medium text-brand transition-colors hover:bg-brand hover:text-paper"
            >
              Leer más sobre tu primera reunión
              <ArrowRight className="size-4" />
            </Link>
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
                — Miembro de AA, Grupo San Ángel
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
    <div className="group flex flex-col rounded-2xl bg-paper p-8 ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:ring-brand/30">
      <span className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand/50">
        {municipality}
      </span>
      <h3 className="mb-4 font-serif text-xl text-brand">{name}</h3>
      <div className="mb-8 flex items-center gap-2 text-sm text-ink/60">
        <Clock className="size-4 text-brand/60" />
        <span>{schedule}</span>
      </div>
      <Link
        to="/grupos/$slug"
        params={{ slug }}
        className="mt-auto inline-flex items-center justify-between gap-2 rounded-sm bg-brand px-5 py-3 text-sm font-semibold uppercase tracking-wider text-paper transition-all hover:bg-brand/90"
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

const helpCards = [
  {
    title: "Creo que tengo problemas con el alcohol",
    body: "Una auto-evaluación breve y confidencial de 12 preguntas puede ayudarte a reconocer tu situación.",
    cta: "Hacer la evaluación",
    to: "/tengo-un-problema",
    icon: HeartHandshake,
  },
  {
    title: "Busco ayuda para un familiar o amigo",
    body: "Información y orientación para acompañar a alguien cercano que enfrenta un problema con la bebida.",
    cta: "Cómo puedo ayudar",
    to: "/que-es-aa",
    icon: Users,
  },
  {
    title: "Ya soy miembro de Alcohólicos Anónimos",
    body: "Consulta reuniones, literatura, eventos del área y accede al área privada de servicio.",
    cta: "Ir al área de servicio",
    to: "/auth",
    icon: MapPin,
  },
] as const;

const firstMeetingItems = [
  {
    title: "No necesitas inscribirte",
    body: "Simplemente llega a la dirección indicada. No hay papeleo, ni formularios, ni requisitos previos.",
  },
  {
    title: "Puedes solo escuchar",
    body: "No estás obligado a hablar ni a presentarte. Muchos asisten su primera vez únicamente a escuchar.",
  },
  {
    title: "No hay cuotas para asistir",
    body: "AA se sostiene con contribuciones voluntarias de sus miembros. Asistir es totalmente gratuito.",
  },
  {
    title: "Se respeta el anonimato",
    body: "Lo que se dice en la reunión, se queda en la reunión. Tu privacidad es nuestra prioridad absoluta.",
  },
];
