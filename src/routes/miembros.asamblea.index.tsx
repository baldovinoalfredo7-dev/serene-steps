import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Images, BookOpenText, ArrowRight } from "lucide-react";
import { AssemblyReports } from "@/components/miembros/AssemblyReports";
import { countFlyers, sortedAsambleas } from "@/lib/asambleas-data";

export const Route = createFileRoute("/miembros/asamblea/")({
  head: () => ({
    meta: [
      { title: "Informes de las Asambleas · AA Área 2 Metropolitana" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: InformesAsambleas,
});

function InformesAsambleas() {
  const asambleas = sortedAsambleas();
  const [actual, ...anteriores] = asambleas;

  return (
    <div className="mx-auto max-w-5xl space-y-14">
      <header className="max-w-3xl">
        <span className="mb-3 block text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand/80">
          Asamblea de Área
        </span>
        <h1 className="font-serif text-3xl italic leading-tight text-brand sm:text-4xl">
          Informes de las Asambleas
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink/80">
          Archivo digital de los informes presentados en las Asambleas del Área 2
          Metropolitana de Barranquilla. Toca cualquier flyer para verlo en tamaño completo.
        </p>
        <Link to="/miembros/asamblea/acerca-de" className="btn-aa-outline mt-6">
          <BookOpenText className="size-4" />
          ¿Qué es la Asamblea de Área?
        </Link>
      </header>

      {actual && (
        <section aria-labelledby="asamblea-actual" className="space-y-8">
          <div className="rounded-2xl border border-brand/10 bg-brand-soft/50 px-5 py-5 sm:px-7 sm:py-6">
            <span className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand/80">
              <CalendarDays className="size-4" /> Asamblea más reciente
            </span>
            <h2
              id="asamblea-actual"
              className="mt-2 font-serif text-2xl italic text-brand sm:text-3xl"
            >
              Asamblea del {actual.label}
            </h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-ink/75">
              <Images className="size-4 text-brand/70" />
              {countFlyers(actual)} informes disponibles
            </p>
          </div>

          <AssemblyReports assembly={actual} />
        </section>
      )}

      <section aria-labelledby="anteriores" className="space-y-5">
        <div className="border-b border-brand/10 pb-3">
          <h2 id="anteriores" className="font-serif text-xl italic text-brand">
            Asambleas anteriores
          </h2>
          <p className="mt-1 text-sm text-ink/70">
            Consulta el archivo histórico de informes por fecha.
          </p>
        </div>

        {anteriores.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-brand/20 bg-soft/50 px-5 py-6 text-sm text-ink/70">
            Aquí se irán archivando las Asambleas a medida que se realicen nuevas.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {anteriores.map((a) => (
              <article key={a.id} className="card-aa flex flex-col">
                <span className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-brand/80">
                  <CalendarDays className="size-4" /> Asamblea
                </span>
                <h3 className="mt-2 font-serif text-lg italic text-brand">{a.label}</h3>
                <p className="mt-2 flex-1 text-sm text-ink/70">
                  {countFlyers(a)} informes disponibles
                </p>
                <Link
                  to="/miembros/asamblea/$id"
                  params={{ id: a.id }}
                  className="btn-aa mt-5 self-start"
                >
                  Ver informes <ArrowRight className="size-4" />
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
