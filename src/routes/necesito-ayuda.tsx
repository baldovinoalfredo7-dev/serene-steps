import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/necesito-ayuda")({
  head: () => ({
    meta: [
      { title: "Busco ayuda — AA Área 2 Metropolitana" },
      {
        name: "description",
        content:
          "Nos alegra que estés aquí. Elige la opción que mejor describa tu situación para encontrar la información que necesitas.",
      },
      { property: "og:title", content: "Busco ayuda — Alcohólicos Anónimos" },
      {
        property: "og:description",
        content:
          "Dos caminos claros para quien busca ayuda: para mí o para un familiar o un amigo.",
      },
      { property: "og:url", content: "/necesito-ayuda" },
    ],
    links: [{ rel: "canonical", href: "/necesito-ayuda" }],
  }),
  component: BuscoAyuda,
});

function BuscoAyuda() {
  return (
    <section className="flex min-h-[calc(100svh-4rem)] items-center bg-soft/40 py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.25em] text-brand/80">
          Busco ayuda
        </span>
        <h1 className="text-balance font-serif text-4xl leading-tight text-brand md:text-6xl">
          Nos alegra que estés aquí.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-ink/85">
          Queremos ayudarte a encontrar la información que necesitas. Elige la
          opción que mejor describa tu situación.
        </p>

        <div className="mx-auto mt-12 grid max-w-xl gap-4 sm:grid-cols-2">
          <Link
            to="/busco-ayuda-para-mi"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-paper transition-colors hover:bg-brand/90"
          >
            Busco ayuda para mí
          </Link>
          <Link
            to="/ayuda-familiar"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-paper transition-colors hover:bg-brand/90"
          >
            Busco ayuda para un familiar o un amigo
          </Link>
        </div>
      </div>
    </section>
  );
}
