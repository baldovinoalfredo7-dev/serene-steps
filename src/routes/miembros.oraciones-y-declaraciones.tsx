import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpenText, Quote, HandHeart, ScrollText, type LucideIcon } from "lucide-react";
import { MemberPageHeader } from "@/components/miembros/SectionCard";

export const Route = createFileRoute("/miembros/oraciones-y-declaraciones")({
  head: () => ({
    meta: [
      {
        title:
          "Nuestras oraciones, lemas y declaraciones · Portal para Miembros",
      },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: OracionesDeclaracionesPage,
});

const cards: {
  to: string;
  icon: LucideIcon;
  emoji: string;
  title: string;
  description: string;
}[] = [
  {
    to: "/miembros/oraciones",
    icon: BookOpenText,
    emoji: "🙏",
    title: "Nuestras oraciones",
    description:
      "Las oraciones que hacen parte de nuestra literatura y de la práctica habitual de muchos grupos.",
  },
  {
    to: "/miembros/lemas",
    icon: Quote,
    emoji: "💬",
    title: "Nuestros lemas",
    description:
      "Frases sencillas que resumen actitudes útiles para vivir el programa un día a la vez.",
  },
  {
    to: "/miembros/responsabilidad",
    icon: HandHeart,
    emoji: "🤝",
    title: "Declaración de Responsabilidad",
    description:
      "Nuestro compromiso de estar siempre disponibles para quien pide ayuda.",
  },
  {
    to: "/miembros/principios",
    icon: ScrollText,
    emoji: "📖",
    title: "Los 36 principios",
    description:
      "Los Doce Pasos, las Doce Tradiciones y los Doce Conceptos para el Servicio Mundial.",
  },
];

function OracionesDeclaracionesPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <MemberPageHeader
        title="Nuestras oraciones, lemas y declaraciones"
        intro="En este espacio reunimos las oraciones, los lemas, la Declaración de Responsabilidad y los 36 principios de Alcohólicos Anónimos."
      />
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <article key={c.to} className="card-aa flex flex-col">
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
            <Link to={c.to} className="btn-aa mt-6 self-start">
              Ingresar <ArrowRight className="size-4" />
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
