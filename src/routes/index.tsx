import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import heroImage from "@/assets/hero-room.jpg";
import { groupsQueryOptions } from "@/lib/groups-queries";
import { ArrowRight } from "lucide-react";

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

function Home() {
  const { data: groups } = useSuspenseQuery(groupsQueryOptions());
  return <HomeContent groups={groups} />;
}

function HomeContent({ groups }: { groups: import("@/lib/groups-data").Group[] }) {
  return (
    <>
      {/* 1. HERO DE BIENVENIDA */}
      <section className="relative overflow-hidden bg-soft">
        <img
          src={heroImage}
          alt=""
          width={1600}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/85 via-paper/70 to-paper/95" />

        <div className="relative mx-auto flex min-h-[58svh] max-w-4xl flex-col items-center justify-center px-6 py-16 text-center md:min-h-[60svh] md:py-20">
          <p className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-brand/80 sm:text-xs">
            Área 2 Metropolitana · Barranquilla
          </p>
          <h1 className="mb-6 max-w-3xl text-balance font-serif text-4xl leading-[1.05] text-brand sm:text-5xl lg:text-6xl">
            Alcohólicos Anónimos
          </h1>
          <p className="mb-9 max-w-2xl text-pretty font-serif text-xl italic leading-snug text-brand/90 sm:text-2xl md:text-3xl">
            La ayuda está más cerca de lo que imaginas.
          </p>
          <a
            href="#busco-ayuda"
            className="inline-flex min-h-14 items-center gap-3 rounded-full bg-brand px-10 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-paper transition-colors hover:bg-brand-soft"
          >
            Busco ayuda
            <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      {/* 2. BUSCO AYUDA */}
      <HomeBlock
        id="busco-ayuda"
        eyebrow="Busco ayuda"
        title="Estás en el lugar correcto."
        body="Para ti o para alguien que quieres. Aquí encontrarás una comunidad que ha vivido lo mismo y que te recibe con calma, respeto y anonimato. No hay inscripciones, no hay cuotas, no hay requisitos."
        cta={{ to: "/necesito-ayuda", label: "Cómo empezar" }}
      />

      {/* 3. COOPERACIÓN CON LA COMUNIDAD */}
      <HomeBlock
        eyebrow="Cooperación con la comunidad"
        title="Trabajamos junto a quienes acompañan a otros."
        body="Profesionales de la salud, educadores, líderes comunitarios e instituciones encuentran en Alcohólicos Anónimos un aliado silencioso para orientar a quienes puedan encontrar aquí un lugar seguro."
        cta={{ to: "/contacto", label: "Hablemos" }}
        tone="soft"
      />

      {/* 4. YA SOY MIEMBRO */}
      <HomeBlock
        eyebrow="Ya soy miembro"
        title="Bienvenido de vuelta."
        body="Ingresa con las credenciales que recibiste en tu grupo o en el Área para acompañar a tu comunidad y seguir compartiendo experiencia, fortaleza y esperanza."
        cta={{ to: "/auth", label: "Acceso para miembros" }}
      />

      {/* 5. ENCUENTRA UN GRUPO */}
      <section className="bg-soft/50 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 max-w-2xl">
            <span className="mb-4 block text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-brand">
              Directorio del Área 2
            </span>
            <h2 className="mb-6 font-serif text-3xl leading-tight text-brand sm:text-4xl md:text-5xl">
              Encuentra un grupo cerca de ti.
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
              Ver directorio completo <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. INFORMACIÓN INSTITUCIONAL */}
      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <span className="mb-4 block text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-brand">
            Información institucional
          </span>
          <h2 className="mb-8 font-serif text-3xl leading-tight text-brand sm:text-4xl md:text-5xl">
            ¿Qué es Alcohólicos Anónimos?
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

function HomeBlock({
  id,
  eyebrow,
  title,
  body,
  cta,
  tone = "paper",
}: {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: { to: string; label: string };
  tone?: "paper" | "soft";
}) {
  return (
    <section
      id={id}
      className={`${tone === "soft" ? "bg-soft/40" : "bg-paper"} border-t border-brand/5 py-24 md:py-32 scroll-mt-24`}
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
        <div>
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-brand">
            {eyebrow}
          </span>
        </div>
        <div>
          <h2 className="mb-6 font-serif text-3xl leading-tight text-brand sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="mb-10 text-pretty text-lg leading-relaxed text-ink/85 md:text-xl">
            {body}
          </p>
          <Link
            to={cta.to}
            className="inline-flex items-center gap-2 border-b border-brand/30 pb-1 text-sm font-semibold uppercase tracking-[0.18em] text-brand transition-colors hover:border-brand"
          >
            {cta.label} <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
