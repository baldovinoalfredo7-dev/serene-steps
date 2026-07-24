import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { MemberPageHeader } from "@/components/miembros/SectionCard";

export const Route = createFileRoute("/miembros/oraciones/")({
  head: () => ({
    meta: [
      { title: "Nuestras oraciones · Portal para Miembros" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: OracionesPage,
});

const cards = [
  {
    to: "/miembros/oraciones/serenidad",
    emoji: "🙏",
    title: "Oración de la Serenidad",
    description:
      "La oración con la que abrimos y cerramos habitualmente muchas de nuestras reuniones.",
  },
  {
    to: "/miembros/oraciones/tercer-paso",
    emoji: "🙏",
    title: "Oración del Tercer Paso",
    description:
      "La oración que acompaña la decisión de poner nuestra voluntad al cuidado de un Poder Superior.",
  },
  {
    to: "/miembros/oraciones/septimo-paso",
    emoji: "🙏",
    title: "Oración del Séptimo Paso",
    description:
      "La oración que acompaña la petición humilde de que nos sean removidos nuestros defectos.",
  },
  {
    to: "/miembros/oraciones/san-francisco",
    emoji: "🙏",
    title: "Oración de San Francisco de Asís",
    description:
      "Una oración que muchos miembros utilizan como guía diaria para vivir los principios del programa.",
  },
];

function OracionesPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <MemberPageHeader
        title="Nuestras oraciones"
        intro="Alcohólicos Anónimos no está afiliado a ninguna religión ni promueve credo alguno. Respetamos las creencias de cada persona y entendemos que cada miembro concibe a un Poder Superior según su propia comprensión. En este espacio encontrarás algunas de las oraciones que hacen parte de nuestra literatura y de la práctica habitual de muchos grupos."
      />
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <article
            key={c.to}
            className="flex flex-col rounded-3xl border border-brand/10 bg-paper p-6 shadow-sm transition-shadow hover:shadow-lift"
          >
            <div className="mb-4 flex items-center gap-3">
              <span
                aria-hidden
                className="grid size-11 place-items-center rounded-2xl bg-brand/10 text-brand text-lg"
              >
                {c.emoji}
              </span>
              <h2 className="font-serif text-lg text-brand">{c.title}</h2>
            </div>
            <p className="flex-1 text-sm leading-relaxed text-ink/75">
              {c.description}
            </p>
            <Link
              to={c.to}
              className="mt-6 inline-flex items-center justify-center gap-2 self-start rounded-full bg-brand px-5 py-2 text-sm font-semibold text-paper transition-colors hover:bg-brand/90"
            >
              Ingresar <ArrowRight className="size-4" />
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
