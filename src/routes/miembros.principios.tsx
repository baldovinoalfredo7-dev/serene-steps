import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Handshake, Globe2 } from "lucide-react";
import {
  MemberPageHeader,
  SectionCard,
  SectionGrid,
  ComingSoonNote,
} from "@/components/miembros/SectionCard";

export const Route = createFileRoute("/miembros/principios")({
  head: () => ({
    meta: [
      { title: "Los 36 principios · Portal para Miembros" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: PrincipiosPage,
});

const cards = [
  {
    icon: BookOpen,
    emoji: "📖",
    title: "Doce Pasos",
    description:
      "El programa de recuperación de Alcohólicos Anónimos, expresado en doce pasos sugeridos.",
  },
  {
    icon: Handshake,
    emoji: "🤝",
    title: "Doce Tradiciones",
    description:
      "Los principios que preservan la unidad y el bienestar común de nuestra Comunidad.",
  },
  {
    icon: Globe2,
    emoji: "🌍",
    title: "Doce Conceptos para el Servicio Mundial",
    description:
      "Los principios que orientan la estructura y el servicio de Alcohólicos Anónimos en el mundo.",
  },
];

function PrincipiosPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <MemberPageHeader
        title="Los 36 principios"
        intro="Los Doce Pasos, las Doce Tradiciones y los Doce Conceptos para el Servicio Mundial constituyen los principios fundamentales de Alcohólicos Anónimos. En este espacio podrás consultarlos de forma organizada."
      />
      <SectionGrid>
        {cards.map((c) => (
          <SectionCard key={c.title} {...c}>
            <ComingSoonNote />
          </SectionCard>
        ))}
      </SectionGrid>
    </div>
  );
}
