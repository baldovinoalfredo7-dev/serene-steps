import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Handshake, Globe2, ArrowRight, type LucideIcon } from "lucide-react";
import { MemberPageHeader } from "@/components/miembros/SectionCard";

export const Route = createFileRoute("/miembros/principios/")({
  head: () => ({
    meta: [
      { title: "Los 36 principios · Portal para Miembros" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: PrincipiosPage,
});

type Card = {
  to: string;
  icon: LucideIcon;
  emoji: string;
  title: string;
  description: string;
};

const cards: Card[] = [
  {
    to: "/miembros/principios/doce-pasos",
    icon: BookOpen,
    emoji: "📖",
    title: "Los Doce Pasos",
    description:
      "El programa de recuperación de Alcohólicos Anónimos, expresado en doce pasos sugeridos.",
  },
  {
    to: "/miembros/principios/doce-tradiciones",
    icon: Handshake,
    emoji: "🤝",
    title: "Las Doce Tradiciones",
    description:
      "Los principios que preservan la unidad y el bienestar común de nuestra Comunidad.",
  },
  {
    to: "/miembros/principios/doce-conceptos",
    icon: Globe2,
    emoji: "🌍",
    title: "Los Doce Conceptos para el Servicio Mundial",
    description:
      "Los principios que orientan la estructura y el servicio de Alcohólicos Anónimos en el mundo.",
  },
];

function PrincipiosPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <MemberPageHeader
        title="Los 36 principios"
        intro="Los Doce Pasos, las Doce Tradiciones y los Doce Conceptos para el Servicio Mundial constituyen los principios fundamentales de Alcohólicos Anónimos. En este espacio podrás consultarlos respetando siempre su redacción oficial."
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
                className="grid size-11 place-items-center rounded-2xl bg-brand/10 text-brand"
              >
                <c.icon className="size-5" />
              </span>
              <h2 className="font-serif text-lg text-brand">
                <span aria-hidden className="mr-1">
                  {c.emoji}
                </span>
                {c.title}
              </h2>
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
