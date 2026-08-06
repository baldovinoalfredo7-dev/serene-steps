import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import heroSalon from "@/assets/hero-salon-area2.jpg";

import caribeMap from "@/assets/caribe-map.jpg";
import { groupsQueryOptions } from "@/lib/groups-queries";
import type { Group } from "@/lib/groups-data";
import { visiblePublications } from "@/lib/literatura-data";
import { PublicationCard } from "@/components/site/PublicationCard";
import { ArrowRight } from "lucide-react";


export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(groupsQueryOptions()),
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
              Conoce nuestra literatura
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink/80">
              La literatura de Alcohólicos Anónimos reúne la experiencia, fortaleza y esperanza de
              miles de personas que encontraron una nueva manera de vivir sin alcohol. A través de
              libros, folletos y publicaciones, podrás conocer mejor nuestro programa de
              recuperación y la experiencia compartida de quienes lo viven día a día.
            </p>
          </div>

          <ul role="list" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visiblePublications.map((item) => (
              <li key={item.slug} className="h-full">
                <PublicationCard item={item} />
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-2xl border border-brand/10 bg-soft/60 p-7 md:p-8">
            <h3 className="font-serif text-xl text-brand">
              ¿Es tu primer acercamiento a Alcohólicos Anónimos?
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink/80">
              Si deseas conocer cómo funciona nuestro programa de recuperación, te recomendamos
              comenzar por el Libro Grande, la obra donde nació Alcohólicos Anónimos. También
              encontrarás folletos gratuitos con respuestas a las preguntas más frecuentes.
            </p>
          </div>

          <div className="mt-10">
            <Link to="/literatura" className="btn-aa">
              Explorar la literatura <ArrowRight className="size-4" />
            </Link>
          </div>

          <figure className="mx-auto mt-16 max-w-2xl border-t border-brand/10 pt-8 text-center">
            <blockquote className="font-serif text-lg italic leading-relaxed text-brand/90 sm:text-xl">
              Cada libro, folleto y publicación nace de la experiencia compartida de quienes
              encontraron una nueva manera de vivir. Quizá en sus páginas encuentres una historia
              que también hable de ti.
            </blockquote>
          </figure>

        </div>
      </section>

      {/* 9. VISITA NUESTRA OFICINA */}
      <section className="border-t border-brand/5 bg-soft/40 py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-6 font-serif text-3xl leading-[1.15] text-brand sm:text-4xl">
            Visita nuestra oficina
          </h2>
          <p className="mx-auto mb-9 max-w-2xl text-pretty text-base leading-[1.7] text-ink/85">
            Si prefieres recibir orientación personalmente, nuestra Oficina del Área 2
            Metropolitana de Barranquilla está disponible para atenderte. Allí encontrarás
            información sobre reuniones, literatura y los diferentes servicios que ofrece nuestra
            Comunidad.
          </p>
          <Link to="/bienvenida" className="btn-aa uppercase tracking-[0.15em]">
            Conocer la oficina <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

