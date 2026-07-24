import { createFileRoute } from "@tanstack/react-router";
import { HandHeart } from "lucide-react";
import {
  MemberPageHeader,
  SectionCard,
  SectionGrid,
  ComingSoonNote,
} from "@/components/miembros/SectionCard";

export const Route = createFileRoute("/miembros/oraciones")({
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
    emoji: "🙏",
    title: "Oración de la Serenidad",
    description:
      "La oración con la que abrimos y cerramos habitualmente muchas de nuestras reuniones.",
  },
  {
    emoji: "🙏",
    title: "Oración del Tercer Paso",
    description:
      "La oración que acompaña la decisión de poner nuestra voluntad al cuidado de un Poder Superior.",
  },
  {
    emoji: "🙏",
    title: "Oración del Séptimo Paso",
    description:
      "La oración que acompaña la petición humilde de que nos sean removidos nuestros defectos.",
  },
  {
    emoji: "🙏",
    title: "Oración de San Francisco",
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
      <SectionGrid>
        {cards.map((c) => (
          <SectionCard key={c.title} icon={HandHeart} emoji={c.emoji} title={c.title} description={c.description}>
            <ComingSoonNote />
          </SectionCard>
        ))}
      </SectionGrid>
    </div>
  );
}
