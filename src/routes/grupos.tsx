import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { GroupFinder } from "@/components/site/GroupFinder";
import { groupsQueryOptions } from "@/lib/groups-queries";

export const Route = createFileRoute("/grupos")({
  loader: ({ context }) => context.queryClient.ensureQueryData(groupsQueryOptions()),
  head: () => ({
    meta: [
      { title: "Encuentra un grupo de Alcohólicos Anónimos" },
      {
        name: "description",
        content:
          "Busca un grupo de Alcohólicos Anónimos por ciudad, barrio o nombre. Consulta horarios, dirección y cómo llegar.",
      },
      { property: "og:title", content: "Encuentra un grupo de Alcohólicos Anónimos" },
      {
        property: "og:description",
        content:
          "Consulta los horarios de reunión, la dirección y la forma de llegar al grupo que mejor se adapte a tu ubicación.",
      },
      { property: "og:url", content: "/grupos" },
    ],
    links: [{ rel: "canonical", href: "/grupos" }],
  }),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl p-10 text-center text-ink/80">
      No pudimos cargar el directorio: {error.message}
    </div>
  ),
  component: GruposLayout,
});

function GruposLayout() {
  const matches = useMatches();
  const isChild = matches.some((m) => m.routeId === "/grupos/$slug");
  if (isChild) return <Outlet />;
  return <GruposIndex />;
}

function GruposIndex() {
  const { data: groups } = useSuspenseQuery(groupsQueryOptions());

  return (
    <>
      {/* Hero */}
      <section className="border-b border-brand/5 bg-soft/40 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-balance font-serif text-4xl italic leading-tight text-brand md:text-6xl">
            Encuentra un grupo de Alcohólicos Anónimos
          </h1>
          <div className="mx-auto mt-8 space-y-5 text-pretty text-lg leading-relaxed text-ink/85">
            <p>
              Cada grupo de Alcohólicos Anónimos es un lugar donde personas que
              comparten su experiencia, fortaleza y esperanza se ayudan mutuamente
              a recuperarse del alcoholismo.
            </p>
            <p>
              Si es tu primera visita, puedes asistir con tranquilidad. No
              necesitas inscribirte ni hablar si no lo deseas. Puedes simplemente
              escuchar.
            </p>
            <p>Utiliza el buscador para encontrar el grupo más cercano a ti.</p>
          </div>
        </div>
      </section>


      {/* Buscador + resultados (módulo único compartido con la Home) */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl px-6">
          <GroupFinder
            groups={groups}
            variant="full"
            emptyDirectory={
              <div className="rounded-3xl border border-dashed border-brand/25 bg-paper/70 p-10 text-center md:p-14">
                <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.25em] text-brand/70">
                  Directorio en preparación
                </span>
                <p className="font-serif text-2xl italic leading-snug text-brand md:text-3xl">
                  El directorio oficial de grupos será incorporado en la próxima
                  actualización.
                </p>
                <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-ink/85">
                  Estamos consolidando la información verificada de cada grupo
                  (ubicación, horarios y contacto) para presentarla aquí de forma
                  clara y confiable. Mientras tanto, si necesitas ayuda inmediata
                  puedes escribirnos o llamarnos usando el botón de contacto.
                </p>
              </div>
            }
          />
        </div>
      </section>

      {/* CTA primera reunión */}
      <section className="bg-brand py-20 text-paper">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.3em] text-paper/60">
            Para ti que llegas por primera vez
          </span>
          <h2 className="text-balance font-serif text-4xl italic leading-tight md:text-5xl">
            ¿Es tu primera reunión?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-paper/85">
            Conoce con calma qué sucede en una reunión de AA antes de asistir. Sin
            inscripciones, sin costo y con total respeto por tu anonimato.
          </p>
          <Link
            to="/necesito-ayuda"
            className="mt-10 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-paper px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-brand transition-colors hover:bg-paper/90"
          >
            Conocer mi primera reunión
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
