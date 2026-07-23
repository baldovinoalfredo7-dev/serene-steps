import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import heroAsset from "@/assets/hero-circle.jpg.asset.json";
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

const doors: readonly Door[] = [
  {
    eyebrow: "Busco ayuda",
    intro: "Información para quienes creen tener un problema con el alcohol, o para familiares y amigos.",
    to: "/necesito-ayuda",
    cta: "Ingresar",
  },
  {
    eyebrow: "Bienvenido a tu casa en el Área 2",
    intro: "Conoce quiénes somos, nuestra historia y cómo nos organizamos para llevar el mensaje.",
    to: "/que-es-aa",
    cta: "Ingresar",
  },
  {
    eyebrow: "No tengo problemas con la bebida, pero quiero cooperar",
    intro: "Profesionales, instituciones y personas interesadas en colaborar con Alcohólicos Anónimos.",
    to: "/contacto",
    cta: "Ingresar",
  },
  {
    eyebrow: "Ya soy miembro",
    intro: "Acceso al portal privado para miembros con credenciales entregadas por su grupo o por el Área.",
    to: "/auth",
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
          alt="Reunión serena con una silla vacía"
          width={1600}
          height={1104}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/75 via-paper/60 to-paper/95" />

        <div className="relative mx-auto flex min-h-[52svh] max-w-4xl flex-col items-center justify-center px-6 py-16 text-center md:min-h-[54svh] md:py-20">
          <p className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-brand/80 sm:text-xs">
            Área 2 Metropolitana · Barranquilla
          </p>
          <h1 className="mb-6 max-w-3xl text-balance font-serif text-4xl leading-[1.05] text-brand sm:text-5xl lg:text-6xl">
            ¿Tienes problemas con el alcohol?
          </h1>
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-ink/85 sm:text-xl">
            En Alcohólicos Anónimos encontrarás personas que han pasado por lo
            mismo, dispuestas a escucharte y a compartir su experiencia.
          </p>
        </div>
      </section>

      {/* 2. LAS CUATRO PUERTAS */}
      <section className="border-t border-brand/5 bg-paper py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <ul role="list" className="grid gap-px overflow-hidden rounded-2xl border border-brand/10 bg-brand/10 md:grid-cols-2">
            {doors.map((d) => (
              <li key={d.to} className="bg-paper">
                <Link
                  to={d.to}
                  className="flex h-full flex-col gap-5 p-8 transition-colors hover:bg-soft/60 md:p-10"
                >
                  <h2 className="font-serif text-2xl leading-tight text-brand md:text-3xl">
                    {d.eyebrow}
                  </h2>
                  <p className="text-base leading-relaxed text-ink/85">
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

      {/* 3. ENCUENTRA UN GRUPO */}
      <section className="bg-soft/50 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 max-w-2xl">
            <span className="mb-4 block text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-brand">
              Encuentra un grupo
            </span>
            <h2 className="mb-6 font-serif text-3xl leading-tight text-brand sm:text-4xl md:text-5xl">
              Busca por ciudad, municipio, barrio o nombre.
            </h2>
            <p className="text-lg leading-relaxed text-ink/85">
              Consulta los grupos disponibles y sus horarios de reunión.
            </p>
          </div>

          {/* Módulo único de "Encuentra un grupo" — mismo componente que /grupos */}
          <GroupFinder groups={groups} variant="compact" maxResults={6} />


          <div className="mt-10">
            <Link
              to="/grupos"
              className="inline-flex items-center gap-2 border-b border-brand/30 pb-1 text-sm font-semibold uppercase tracking-[0.18em] text-brand transition-colors hover:border-brand"
            >
              Ver todos los grupos <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. AA EN EL CARIBE COLOMBIANO */}
      <section className="bg-paper py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <span className="mb-4 block text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-brand">
                Alcohólicos Anónimos en el Caribe colombiano
              </span>
              <h2 className="mb-6 font-serif text-3xl leading-tight text-brand sm:text-4xl">
                Presencia en la región.
              </h2>
              <p className="text-pretty text-lg leading-relaxed text-ink/85">
                Contamos con grupos en distintas ciudades y municipios del Caribe
                colombiano. Acércate al más cercano o escríbenos para orientarte.
              </p>
            </div>
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
          </div>
        </div>
      </section>

      {/* 5. NUESTRA LITERATURA */}
      <section className="border-t border-brand/5 bg-soft/40 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 max-w-2xl">
            <span className="mb-4 block text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-brand">
              Nuestra literatura
            </span>
            <h2 className="font-serif text-3xl leading-tight text-brand sm:text-4xl">
              Libros y folletos de A.A.
            </h2>
          </div>

          <ul role="list" className="grid gap-px overflow-hidden rounded-2xl border border-brand/10 bg-brand/10 sm:grid-cols-2 lg:grid-cols-4">
            {literatura.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.title} className="bg-paper">
                  <Link
                    to="/literatura"
                    className="flex h-full flex-col gap-5 p-8 transition-colors hover:bg-soft/60"
                  >
                    <Icon className="size-6 text-brand/80" strokeWidth={1.5} />
                    <h3 className="font-serif text-xl leading-tight text-brand">
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
