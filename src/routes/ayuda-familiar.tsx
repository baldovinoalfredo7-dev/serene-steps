import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/ayuda-familiar")({
  head: () => ({
    meta: [
      { title: "Ayuda para un familiar o amigo — AA Área 2 Metropolitana" },
      {
        name: "description",
        content:
          "Información para familiares y amigos de personas con problemas de alcohol. Contenido en preparación.",
      },
      { property: "og:title", content: "Ayuda para un familiar o amigo" },
      {
        property: "og:description",
        content:
          "Estamos preparando una sección dedicada a familiares y amigos de personas con problemas de alcohol.",
      },
      { property: "og:url", content: "/ayuda-familiar" },
    ],
    links: [{ rel: "canonical", href: "/ayuda-familiar" }],
  }),
  component: AyudaFamiliar,
});

function AyudaFamiliar() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.25em] text-brand/80">
          Para familiares y amigos
        </span>
        <h1 className="mb-6 font-serif text-4xl leading-tight text-brand md:text-5xl">
          Busco ayuda para un familiar o un amigo
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-pretty text-lg text-ink/85">
          Estamos preparando esta sección con información dedicada a quienes acompañan a
          una persona con problemas de alcohol. Muy pronto encontrarás aquí orientación y
          recursos.
        </p>
        <Link
          to="/necesito-ayuda"
          className="inline-flex items-center gap-2 border-b border-brand/30 pb-1 text-sm font-semibold uppercase tracking-[0.18em] text-brand transition-colors hover:border-brand"
        >
          Volver a Busco ayuda <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
