import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import heroAsset from "@/assets/hero-welcome.jpg.asset.json";
import caribeMap from "@/assets/caribe-map.jpg";
import { groupsQueryOptions } from "@/lib/groups-queries";
import type { Group } from "@/lib/groups-data";
import { ArrowRight, BookOpen, BookMarked, Sparkles, FileText } from "lucide-react";


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
  intro: string;
  to: string;
  cta: string;
};

const secondaryDoors: readonly Door[] = [
  {
    eyebrow: "Cooperación con profesionales",
    intro:
      "Espacio para profesionales e instituciones que desean colaborar con Alcohólicos Anónimos.",
    to: "/contacto",
    cta: "Ingresar",
  },
  {
    eyebrow: "Ya soy miembro",
    intro:
      "Acceso al portal privado con las credenciales entregadas por tu grupo o por el Área.",
    to: "/auth",
    cta: "Ingresar",
  },
  {
    eyebrow: "Bienvenido a tu casa en el Área 2",
    intro:
      "Conoce quiénes somos, nuestra historia y cómo nos organizamos para llevar el mensaje.",
    to: "/que-es-aa",
    cta: "Ingresar",
  },
] as const;

const literatura = [
  { title: "Libro Grande", icon: BookOpen },
  { title: "Doce Pasos y Doce Tradiciones", icon: BookMarked },
  { title: "Viviendo Sobrio", icon: Sparkles },
  { title: "Folletos", icon: FileText },
] as const;

function Home() {
  const { data: groups } = useSuspenseQuery(groupsQueryOptions());
  return <HomeContent groups={groups} />;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function HomeContent({ groups: _groups }: { groups: Group[] }) {
  return (
    <>
      {/* 1. HERO */}
      <section className="relative overflow-hidden bg-soft">
        <img
          src={heroAsset.url}
          alt="Sala luminosa con círculo de sillas de madera alrededor de una mesa con tazas de café, un termo y literatura de A.A.; luz natural entra por las ventanas y una silla recibe un poco más de luz"
          width={1600}
          height={1104}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/55 via-paper/40 to-paper/85" />

        <div className="relative mx-auto flex min-h-[58svh] max-w-4xl flex-col items-center justify-center px-6 py-20 text-center md:min-h-[60svh] md:py-28">
          <p className="mb-6 text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-brand/80 sm:text-xs">
            Área 2 Metropolitana · Barranquilla
          </p>
          <h1 className="mb-8 max-w-3xl text-balance font-serif text-[2.5rem] leading-[1.08] text-brand sm:text-5xl lg:text-[3.75rem]">
            ¿Problemas con el alcohol?
          </h1>
          <p className="mb-10 max-w-2xl text-pretty text-lg font-semibold leading-[1.6] text-ink drop-shadow-[0_1px_2px_rgba(255,255,255,0.75)] sm:text-xl md:text-2xl">
            No estás solo. Siempre habrá un grupo dispuesto a recibirte
          </p>
          <Link
            to="/necesito-ayuda"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-9 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-paper transition-colors hover:bg-brand/90"
          >
            Busco ayuda <ArrowRight className="size-4" />
          </Link>
        </div>

      </section>

      {/* 2. BUSCO AYUDA — entrada destacada */}
      <section className="border-t border-brand/5 bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span className="mb-5 block text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-brand">
            Busco ayuda
          </span>
          <h2 className="mb-6 font-serif text-3xl leading-[1.15] text-brand sm:text-4xl md:text-5xl">
            Estamos aquí para escucharte
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-pretty text-lg leading-[1.7] text-ink/85">
            Si crees tener un problema con el alcohol, o si buscas orientación
            para un familiar o un amigo, aquí encontrarás una primera respuesta.
          </p>
          <Link
            to="/necesito-ayuda"
            className="inline-flex items-center gap-2 border-b border-brand/30 pb-1 text-sm font-semibold uppercase tracking-[0.18em] text-brand transition-colors hover:border-brand"
          >
            Ingresar <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* 3. ENCUENTRA UN GRUPO */}
      <section className="bg-soft/50 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span className="mb-5 block text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-brand">
            Encuentra un grupo
          </span>
          <h2 className="mb-6 font-serif text-3xl leading-[1.15] text-brand sm:text-4xl md:text-5xl">
            Siempre habrá un lugar para ti
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-pretty text-lg leading-[1.7] text-ink/85">
            En cada grupo encontrarás personas que un día también llegaron
            buscando ayuda. No necesitas inscribirte ni hablar si no lo deseas.
          </p>
          <Link
            to="/grupos"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-paper transition-colors hover:bg-brand/90"
          >
            Encontrar un grupo <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* 4-5-6. OTRAS PUERTAS */}
      <section className="border-t border-brand/5 bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <ul
            role="list"
            className="grid gap-px overflow-hidden rounded-2xl border border-brand/10 bg-brand/10 md:grid-cols-3"
          >
            {secondaryDoors.map((d) => (
              <li key={d.to} className="bg-paper">
                <Link
                  to={d.to}
                  className="flex h-full flex-col gap-5 p-8 transition-colors hover:bg-soft/60 md:p-10"
                >
                  <h2 className="font-serif text-2xl leading-[1.2] text-brand md:text-[1.75rem]">
                    {d.eyebrow}
                  </h2>
                  <p className="text-base leading-[1.7] text-ink/85">
                    {d.intro}
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

      {/* 7. AA EN EL CARIBE */}
      <section id="caribe" className="bg-soft/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <div className="overflow-hidden rounded-2xl bg-soft/60 ring-1 ring-brand/10">
              <img
                src={caribeMap}
                alt="Mapa ilustrado del Caribe colombiano"
                width={1600}
                height={1000}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <span className="mb-5 block text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-brand">
                Presencia en el Caribe
              </span>
              <h2 className="mb-6 font-serif text-3xl leading-[1.15] text-brand sm:text-4xl">
                A.A. en el Caribe colombiano
              </h2>
              <p className="text-pretty text-lg leading-[1.7] text-ink/85">
                El Área 2 Metropolitana forma parte de una comunidad más amplia
                de Alcohólicos Anónimos presente en toda la costa Caribe.
                Dondequiera que estés, es posible que haya un grupo cerca de ti.
              </p>
              <div className="mt-8">
                <Link
                  to="/caribe"
                  className="inline-flex items-center gap-2 border-b border-brand/30 pb-1 text-sm font-semibold uppercase tracking-[0.18em] text-brand transition-colors hover:border-brand"
                >
                  Conocer más <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. NUESTRA LITERATURA */}
      <section className="border-t border-brand/5 bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 max-w-2xl">
            <span className="mb-5 block text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-brand">
              Nuestra literatura
            </span>
            <h2 className="font-serif text-3xl leading-[1.15] text-brand sm:text-4xl">
              Libros y folletos de A.A.
            </h2>
          </div>

          <ul
            role="list"
            className="grid gap-px overflow-hidden rounded-2xl border border-brand/10 bg-brand/10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {literatura.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.title} className="bg-paper">
                  <Link
                    to="/literatura"
                    className="flex h-full flex-col gap-5 p-8 transition-colors hover:bg-soft/60"
                  >
                    <Icon className="size-6 text-brand/80" strokeWidth={1.5} />
                    <h3 className="font-serif text-xl leading-[1.2] text-brand">
                      {item.title}
                    </h3>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-10">
            <Link
              to="/literatura"
              className="inline-flex items-center gap-2 border-b border-brand/30 pb-1 text-sm font-semibold uppercase tracking-[0.18em] text-brand transition-colors hover:border-brand"
            >
              Explorar la literatura <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
