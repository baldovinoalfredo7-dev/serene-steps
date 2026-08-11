import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Images } from "lucide-react";
import { AssemblyReports } from "@/components/miembros/AssemblyReports";
import { countFlyers, getAsamblea } from "@/lib/asambleas-data";

export const Route = createFileRoute("/miembros/asamblea/$id")({
  head: () => ({
    meta: [
      { title: "Informes de la Asamblea · AA Área 2 Metropolitana" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  loader: ({ params }) => {
    const assembly = getAsamblea(params.id);
    if (!assembly) throw notFound();
    return { assembly };
  },
  component: AsambleaArchivo,
});

function AsambleaArchivo() {
  const { assembly } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-5xl space-y-12">
      <header>
        <Link to="/miembros/asamblea" className="btn-aa-outline mb-6">
          <ArrowLeft className="size-4" /> Volver a los informes
        </Link>
        <span className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand/80">
          <CalendarDays className="size-4" /> Asamblea de Área
        </span>
        <h1 className="mt-2 font-serif text-3xl italic leading-tight text-brand sm:text-4xl">
          Asamblea del {assembly.label}
        </h1>
        <p className="mt-3 flex items-center gap-2 text-sm text-ink/75">
          <Images className="size-4 text-brand/70" />
          {countFlyers(assembly)} informes disponibles
        </p>
      </header>

      <AssemblyReports assembly={assembly} />
    </div>
  );
}
