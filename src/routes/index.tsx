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
    eyebrow: "Bienvenido al Área 2 Metropolitana de Barranquilla",
    intro:
      "Una breve presentación del Área y los datos de contacto de la Oficina del Área.",
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
          className="h-[34svh] w-full object-cover object-[50%_45%] sm:h-[42svh] md:h-[62svh] md:max-h-[620px]"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-full bg-gradient-to-b from-paper/5 via-transparent to-paper/25 md:block" />

        {/* Escritorio: bloque superpuesto, centrado entre ambos cuadros */}
        <div className="absolute inset-0 mx-auto hidden max-w-xl flex-col items-center justify-center px-6 pb-[10%] text-center md:flex">
          <h1 className="mb-4 whitespace-nowrap font-serif text-[1.85rem] font-semibold leading-[1.15] text-brand-strong [text-shadow:0_1px_6px_rgba(255,255,255,0.85),0_0_22px_rgba(255,255,255,0.7)] lg:text-[2.1rem]">
            ¿Problemas con el alcohol?
          </h1>
          <p className="mb-7 whitespace-nowrap text-lg font-semibold leading-[1.5] text-ink [text-shadow:0_1px_5px_rgba(255,255,255,0.9),0_0_18px_rgba(255,255,255,0.7)]">
            Siempre habrá un grupo dispuesto a recibirte
          </p>
          <Link
            to="/necesito-ayuda"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand px-7 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-paper shadow-soft transition-colors hover:bg-brand/90"
          >
            Busco ayuda <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Móvil: composición propia, texto bajo la fotografía */}
        <div className="flex flex-col items-center px-6 pb-10 pt-7 text-center md:hidden">
          <h1 className="mb-3 text-balance font-serif text-[1.55rem] font-semibold leading-[1.2] text-brand-strong">
            ¿Problemas con el alcohol?
          </h1>
          <p className="mb-6 max-w-[26ch] text-pretty text-base font-medium leading-[1.55] text-ink/90">
            Siempre habrá un grupo dispuesto a recibirte
          </p>
          <Link
            to="/necesito-ayuda"
            className="inline-flex min-h-12 w-full max-w-xs items-center justify-center gap-2 rounded-full bg-brand px-7 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-paper transition-colors hover:bg-brand/90"
          >
            Busco ayuda <ArrowRight className="size-4" />
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
            Eres bienvenido.
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
