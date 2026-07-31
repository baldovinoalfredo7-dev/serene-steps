import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import heroSalon from "@/assets/hero-salon-area2.jpg";

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
    eyebrow: "Quiero cooperar",
    intro:
      "Si deseas conocer cómo Alcohólicos Anónimos coopera con profesionales, instituciones y la comunidad, este espacio es para ti.",
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
    eyebrow: "Nuestra Área de Servicio",
    intro:
      "Conozca el Área de Servicio, la ubicación de la Oficina del Área y los diferentes medios de contacto disponibles para los grupos y miembros de nuestra Comunidad.",
    to: "/bienvenida",
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
          src={heroSalon}
          alt="Salón de reunión de Alcohólicos Anónimos: mesa redonda de madera con el Libro Grande, tazas de café y un termo; en la pared izquierda un cuadro con el logotipo de AA y el texto Alcohólicos Anónimos, Área 2 Metropolitana de Barranquilla, y en la pared derecha un cuadro con la Oración de la Serenidad"
          width={1920}
          height={1088}
          className="h-[30svh] w-full object-cover object-[50%_45%] sm:h-[36svh] md:h-[52svh] md:max-h-[520px]"
        />
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-l from-paper/90 via-paper/50 to-transparent md:block" />

        {/* Escritorio: bloque de texto sobre el tercio derecho, zona más limpia */}
        <div className="absolute inset-y-0 right-0 hidden w-full max-w-[34rem] flex-col justify-center px-10 text-left md:flex lg:px-14">
          <h1 className="mb-6 text-balance font-serif text-[2rem] font-semibold leading-[1.15] text-brand-strong [text-shadow:0_1px_8px_rgba(255,255,255,0.8)] lg:text-[2.4rem]">
            No tienes que enfrentar esto solo
          </h1>
          <p className="mb-10 max-w-[46ch] text-pretty text-base leading-[1.65] text-ink/90 [text-shadow:0_1px_6px_rgba(255,255,255,0.85)] lg:text-lg">
            En Alcohólicos Anónimos encontrarás personas que un día también
            buscaron ayuda. Siempre habrá un grupo dispuesto a recibirte.
          </p>
          <Link
            to="/necesito-ayuda"
            className="inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-paper shadow-soft transition-all duration-300 ease-out hover:bg-brand/90 hover:shadow-lift"
          >
            Busco ayuda <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Móvil: composición propia, texto bajo la fotografía */}
        <div className="flex flex-col items-center px-6 pb-8 pt-6 text-center md:hidden">
          <h1 className="mb-3 text-balance font-serif text-[1.6rem] font-semibold leading-[1.2] text-brand-strong">
            No tienes que enfrentar esto solo
          </h1>
          <p className="mb-6 max-w-[34ch] text-pretty text-base leading-[1.6] text-ink/90">
            En A.A. encontrarás personas que un día también buscaron ayuda.
            Siempre habrá un grupo dispuesto a recibirte.
          </p>
          <Link
            to="/necesito-ayuda"
            className="inline-flex min-h-12 w-full max-w-xs items-center justify-center gap-2 rounded-full bg-brand px-7 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-paper transition-all duration-300 ease-out hover:bg-brand/90 hover:shadow-lift"
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
            Eres bienvenido
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-pretty text-lg leading-[1.7] text-ink/85">
            En cada grupo encontrarás personas que un día también llegaron
            buscando ayuda. No necesitas inscribirte ni hablar si no lo deseas.
          </p>
          <Link
            to="/grupos"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-paper transition-all duration-300 ease-out hover:bg-brand/90 hover:shadow-lift"
          >
            Encontrar un grupo <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* 4-5-6. OTRAS PUERTAS */}
      <section className="border-t border-brand/5 bg-paper py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <ul
            role="list"
            className="grid items-stretch gap-6 md:grid-cols-3"
          >
            {secondaryDoors.map((d) => (
              <li key={d.to} className="h-full">
                <Link
                  to={d.to}
                  className="flex h-full flex-col rounded-2xl border border-brand/10 bg-paper p-10 shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand/20 hover:bg-soft/40 hover:shadow-lift md:p-12"
                >
                  <h2 className="mb-4 font-serif text-2xl leading-[1.2] text-brand md:text-[1.75rem]">
                    {d.eyebrow}
                  </h2>
                  <p className="mb-8 text-base leading-[1.7] text-ink/85">
                    {d.intro}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand transition-colors duration-300 group-hover:text-brand-strong">
                    {d.cta} <ArrowRight className="size-4 transition-transform duration-300" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

        </div>
      </section>

      {/* 7. AA EN EL CARIBE */}
      <section id="caribe" className="bg-soft/40 py-12 md:py-16">
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
      <section className="border-t border-brand/5 bg-paper py-12 md:py-16">
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
            className="grid gap-px overflow-hidden rounded-2xl border border-brand/10 bg-brand/10 shadow-soft sm:grid-cols-2 lg:grid-cols-4"
          >
            {literatura.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.title} className="bg-paper">
                  <Link
                    to="/literatura"
                    className="flex h-full flex-col gap-5 p-9 transition-all duration-300 hover:bg-soft/70"
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
