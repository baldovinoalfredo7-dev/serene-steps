import { createFileRoute, Link } from "@tanstack/react-router";
import heroImage from "@/assets/hero-window.jpg";
import { groups } from "@/lib/groups-data";
import { ArrowRight, MapPin } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:image", content: "https://project--b2ac4377-59f2-46ea-a581-d53e687bd969.lovable.app/og.jpg" },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = groups.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="px-6 py-12 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <span className="mb-6 block text-xs font-semibold uppercase tracking-[0.25em] text-brand/60">
              Alcohólicos Anónimos · Área 2 Metropolitana
            </span>
            <h1 className="mb-6 text-balance font-serif text-4xl italic leading-tight text-brand lg:text-6xl">
              La ayuda está más cerca de lo que imaginas.
            </h1>
            <p className="mb-10 max-w-[52ch] text-pretty text-lg text-ink/70">
              Si el alcohol está afectando tu vida o la de alguien que amas, no estás solo. Somos
              una comunidad de hombres y mujeres que compartimos nuestra experiencia, fortaleza y
              esperanza. Aquí puedes empezar.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/grupos"
                className="group inline-flex items-center gap-3 rounded-sm bg-brand px-8 py-4 text-base font-semibold uppercase tracking-wider text-paper shadow-lg shadow-brand/20 ring-1 ring-brand transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                Encuentra un grupo
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/que-es-aa"
                className="inline-flex items-center gap-2 rounded-sm bg-soft px-6 py-4 text-sm font-medium text-brand ring-1 ring-black/5 transition-colors hover:bg-soft/70"
              >
                ¿Cómo funciona?
              </Link>
            </div>
            <p className="mt-8 max-w-md text-sm text-ink/50">
              Sin inscripción · Sin cuotas · Anonimato garantizado
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-2xl bg-soft outline outline-1 -outline-offset-1 outline-black/5">
              <img
                src={heroImage}
                alt="Amanecer sereno a través de una ventana"
                width={1200}
                height={1500}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ENCUENTRA UN GRUPO */}
      <section className="bg-soft/50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-brand/60">
                Directorio
              </span>
              <h2 className="mb-4 font-serif text-3xl italic text-brand md:text-4xl">
                Encuentra un grupo cerca de ti
              </h2>
              <p className="max-w-xl text-ink/60">
                Nueve grupos del Área 2 Metropolitana, listos para recibirte.
              </p>
            </div>
            <Link
              to="/grupos"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
            >
              Ver los 9 grupos <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((g) => (
              <GroupPreviewCard key={g.slug} slug={g.slug} name={g.name} municipality={g.municipality} address={g.addressLine} />
            ))}
          </div>
        </div>
      </section>

      {/* PRIMERA REUNIÓN */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-14 text-center">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-brand/60">
              Para tu primera vez
            </span>
            <h2 className="text-balance font-serif text-3xl italic text-brand md:text-4xl">
              ¿Qué puedes esperar de tu primera reunión?
            </h2>
          </div>

          <div className="space-y-10">
            {firstMeetingItems.map((item, i) => (
              <div key={item.title} className="flex gap-6">
                <span className="font-serif text-4xl text-brand/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="mb-2 font-serif text-xl text-brand">{item.title}</h4>
                  <p className="max-w-[56ch] text-pretty text-ink/60">{item.body}</p>
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

      {/* CTA FINAL */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <MapPin className="mx-auto mb-6 size-8 text-brand/50" />
          <h2 className="mb-6 text-balance font-serif text-3xl italic text-brand md:text-4xl">
            El primer paso empieza aquí.
          </h2>
          <p className="mb-10 text-lg text-ink/60">
            Elige un grupo, llega y siéntate. Nadie te pedirá nada. Solo escucha.
          </p>
          <Link
            to="/grupos"
            className="group inline-flex items-center gap-3 rounded-sm bg-brand px-8 py-4 text-base font-semibold uppercase tracking-wider text-paper shadow-lg shadow-brand/20 ring-1 ring-brand transition-all hover:-translate-y-0.5"
          >
            Encuentra un grupo
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}

function GroupPreviewCard({
  slug,
  name,
  municipality,
  address,
}: {
  slug: string;
  name: string;
  municipality: string;
  address: string;
}) {
  return (
    <Link
      to="/grupos/$slug"
      params={{ slug }}
      className="group flex flex-col rounded-2xl bg-paper p-8 ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:ring-brand/20"
    >
      <span className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand/40">
        {municipality}
      </span>
      <h3 className="mb-2 font-serif text-xl text-brand">{name}</h3>
      <p className="mb-8 max-w-[35ch] text-sm text-ink/60">{address}</p>
      <div className="mt-auto flex items-center gap-2 border-t border-brand/5 pt-6 text-sm font-semibold text-brand">
        Ver información
        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

const firstMeetingItems = [
  {
    title: "No necesitas inscribirte",
    body: "Simplemente llega a la dirección indicada. No hay requisitos previos, ni papeleo, ni cuotas de admisión.",
  },
  {
    title: "Puedes solo escuchar",
    body: "No estás obligado a hablar ni a presentarte si no lo deseas. Muchos miembros asisten su primera vez solo para escuchar experiencias.",
  },
  {
    title: "El anonimato es fundamental",
    body: "Lo que se dice en la reunión, se queda en la reunión. Tu privacidad es nuestra prioridad absoluta.",
  },
  {
    title: "Encontrarás personas como tú",
    body: "Hombres y mujeres que vivieron lo mismo y que hoy comparten su experiencia para ayudarte.",
  },
];
