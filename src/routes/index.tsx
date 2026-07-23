import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import heroAsset from "@/assets/hero-circle.jpg.asset.json";
import { groupsQueryOptions } from "@/lib/groups-queries";
import { ArrowRight, HandHeart, Home as HomeIcon, HeartHandshake, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(groupsQueryOptions()),
  head: () => ({
    meta: [
      { property: "og:url", content: "/" },
      { property: "og:image", content: "https://project--b2ac4377-59f2-46ea-a581-d53e687bd969.lovable.app/og.jpg" },
    ],
    links: [{ rel: "canonical", href: "/" }],
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
  title: string;
  body: string;
  to: string;
  cta: string;
  icon: LucideIcon;
  hash?: string;
};

const doors: readonly Door[] = [
  {
    eyebrow: "Busco ayuda",
    title: "Estás en el lugar correcto.",
    body: "Para ti o para alguien que quieres. Aquí te recibimos con calma, respeto y anonimato. Sin inscripciones, sin cuotas, sin requisitos.",
    to: "/necesito-ayuda",
    cta: "Cómo empezar",
    icon: HandHeart,
  },
  {
    eyebrow: "Encuentra un grupo",
    title: "Bienvenido a tu casa en el Área 2.",
    body: "Nueve grupos abiertos en Barranquilla, Soledad, Malambo, Galapa y Puerto Colombia. Elige el más cercano y ven cuando quieras.",
    to: "/grupos",
    cta: "Ver los grupos",
    icon: HomeIcon,
  },
  {
    eyebrow: "Quiero cooperar",
    title: "No tengo problemas con la bebida, pero quiero ayudar.",
    body: "Profesionales de la salud, educadores, familias e instituciones encuentran en AA un aliado silencioso para acompañar a quien lo necesita.",
    to: "/contacto",
    cta: "Hablemos",
    icon: HeartHandshake,
  },
  {
    eyebrow: "Ya soy miembro",
    title: "Bienvenido de vuelta.",
    body: "Ingresa con las credenciales que recibiste en tu grupo o en el Área para seguir compartiendo experiencia, fortaleza y esperanza.",
    to: "/auth",
    cta: "Acceso para miembros",
    icon: UserRound,
  },
] as const;

function Home() {
  const { data: groups } = useSuspenseQuery(groupsQueryOptions());
  return <HomeContent groups={groups} />;
}

function HomeContent({ groups }: { groups: import("@/lib/groups-data").Group[] }) {
  return (
    <>
      {/* 1. HERO */}
      <section className="relative overflow-hidden bg-soft">
        <img
          src={heroAsset.url}
          alt="Reunión de Alcohólicos Anónimos con una silla vacía al frente, símbolo de bienvenida"
          width={1600}
          height={1104}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/70 via-paper/55 to-paper/95" />

        <div className="relative mx-auto flex min-h-[62svh] max-w-4xl flex-col items-center justify-center px-6 py-20 text-center md:min-h-[64svh] md:py-24">
          <p className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-brand/80 sm:text-xs">
            Área 2 Metropolitana · Barranquilla
          </p>
          <h1 className="mb-6 max-w-3xl text-balance font-serif text-4xl leading-[1.05] text-brand sm:text-5xl lg:text-6xl">
            ¿Tienes problemas con el alcohol?
          </h1>
          <p className="mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-ink/90 sm:text-xl">
            En Alcohólicos Anónimos encontrarás personas que han pasado por lo
            mismo, dispuestas a escucharte y a compartir su experiencia.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <a
              href="#puertas"
              className="inline-flex min-h-14 items-center gap-3 rounded-full bg-brand px-10 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-paper transition-colors hover:bg-brand-soft"
            >
              Busco ayuda
              <ArrowRight className="size-4" />
            </a>
            <Link
              to="/grupos"
              className="inline-flex min-h-14 items-center gap-3 rounded-full border border-brand/30 bg-paper/80 px-10 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-brand backdrop-blur-sm transition-colors hover:bg-paper"
            >
              Encuentra un grupo
            </Link>
          </div>
        </div>
      </section>

      {/* 2. LAS CUATRO PUERTAS */}
      <section id="puertas" className="scroll-mt-24 border-t border-brand/5 bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center md:mb-20">
            <span className="mb-4 block text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-brand">
              Pasa adelante
            </span>
            <h2 className="font-serif text-3xl leading-tight text-brand sm:text-4xl md:text-5xl">
              La puerta está abierta para ti.
            </h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-ink/85">
              Elige el camino que te representa. Cualquiera que sea, aquí te
              recibimos con la misma calma.
            </p>
          </div>

          <ul role="list" className="grid gap-px overflow-hidden rounded-2xl border border-brand/10 bg-brand/10 md:grid-cols-2">
            {doors.map((d) => (
              <li key={d.to} className="bg-paper">
                <Link
                  to={d.to}
                  className="flex h-full flex-col gap-6 p-8 transition-colors hover:bg-soft/60 md:p-10"
                >
                  <div className="flex items-center gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                      <d.icon className="size-5" strokeWidth={1.7} />
                    </span>
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand/80">
                      {d.eyebrow}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl leading-tight text-brand md:text-3xl">
                    {d.title}
                  </h3>
                  <p className="text-base leading-relaxed text-ink/85">
                    {d.body}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                    {d.cta} <ArrowRight className="size-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. ENCUENTRA UN GRUPO */}
      <section className="bg-soft/50 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 max-w-2xl">
            <span className="mb-4 block text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-brand">
              Encuentra un grupo
            </span>
            <h2 className="mb-6 font-serif text-3xl leading-tight text-brand sm:text-4xl md:text-5xl">
              Un grupo cerca de ti.
            </h2>
            <p className="text-lg leading-relaxed text-ink/85">
              Nueve grupos abiertos en los municipios del Área 2 Metropolitana.
            </p>
          </div>

          <ul role="list" className="grid gap-px overflow-hidden rounded-2xl border border-brand/10 bg-brand/10 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((g) => (
              <li key={g.slug} className="bg-paper">
                <Link
                  to="/grupos/$slug"
                  params={{ slug: g.slug }}
                  className="flex h-full flex-col justify-between gap-6 p-8 transition-colors hover:bg-soft/60"
                >
                  <div>
                    <span className="mb-3 block text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand/70">
                      {g.municipality}
                    </span>
                    <h3 className="font-serif text-xl leading-tight text-brand md:text-2xl">
                      {g.name}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                    Ver información <ArrowRight className="size-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <Link
              to="/grupos"
              className="inline-flex items-center gap-2 border-b border-brand/30 pb-1 text-sm font-semibold uppercase tracking-[0.18em] text-brand transition-colors hover:border-brand"
            >
              Ver todos los grupos <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. ¿QUÉ ES AA? */}
      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <span className="mb-4 block text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-brand">
            ¿Qué es Alcohólicos Anónimos?
          </span>
          <h2 className="mb-8 font-serif text-3xl leading-tight text-brand sm:text-4xl md:text-5xl">
            Una comunidad que se sostiene compartiendo.
          </h2>
          <p className="mb-6 text-pretty text-lg leading-relaxed text-ink/85 md:text-xl">
            Alcohólicos Anónimos es una comunidad de hombres y mujeres que
            comparten su experiencia, fortaleza y esperanza para resolver su
            problema común y ayudar a otros a recuperarse del alcoholismo.
          </p>
          <p className="mb-12 text-pretty text-lg leading-relaxed text-ink/85 md:text-xl">
            El único requisito para ser miembro es el deseo de dejar la bebida.
            No hay honorarios ni cuotas: se sostiene con sus propias
            contribuciones. No está afiliada a ninguna secta, religión, partido
            político, organización o institución alguna.
          </p>
          <Link
            to="/que-es-aa"
            className="inline-flex items-center gap-2 border-b border-brand/30 pb-1 text-sm font-semibold uppercase tracking-[0.18em] text-brand transition-colors hover:border-brand"
          >
            Conocer más sobre AA <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
