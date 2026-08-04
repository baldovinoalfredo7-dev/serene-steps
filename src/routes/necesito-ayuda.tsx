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
      { property: "og:url", content: "https://hope-finds-you-here.lovable.app/necesito-ayuda" },
    ],
    links: [{ rel: "canonical", href: "https://hope-finds-you-here.lovable.app/necesito-ayuda" }],
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
          Nos alegra que estés aquí
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-ink/85">
          Queremos ayudarte a encontrar la información que necesitas. Elige la
          opción que mejor describa tu situación.
        </p>

        <div className="mx-auto mt-12 grid max-w-xl gap-4 sm:grid-cols-2">
          <Link
            to="/busco-ayuda-para-mi"
            className="btn-aa text-center uppercase tracking-[0.18em]"
          >
            Busco ayuda para mí
          </Link>
          <Link
            to="/ayuda-familiar"
            className="btn-aa text-center uppercase tracking-[0.18em]"
          >
            Busco ayuda para un familiar o un amigo
          </Link>
        </div>
      </div>
    </section>
  );
}
