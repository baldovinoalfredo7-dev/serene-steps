import { createFileRoute } from "@tanstack/react-router";
import { NotebookPen, FolderOpen, ArrowRight } from "lucide-react";
import {
  MemberPageHeader,
  SectionCard,
  SectionGrid,
} from "@/components/miembros/SectionCard";

export const Route = createFileRoute("/miembros/documentos")({
  head: () => ({
    meta: [
      { title: "Documentos para descargar · Portal para Miembros" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: DocumentosPage,
});

const cards = [
  {
    icon: NotebookPen,
    emoji: "📝",
    title: "Talleres",
    description: "Materiales de estudio y apoyo para desarrollar en los grupos.",
    button: "Ver talleres",
  },
  {
    icon: FolderOpen,
    emoji: "📂",
    title: "Formatos y documentos",
    description:
      "Cartas modelo, formatos, informes y demás documentos de apoyo para el servicio.",
    button: "Ver documentos",
  },
];

function DocumentosPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <MemberPageHeader
        title="Documentos para descargar"
        intro="Aquí encontrarás recursos de apoyo para el servicio del Área 2 Metropolitana de Barranquilla."
      />
      <SectionGrid>
        {cards.map((c) => (
          <SectionCard
            key={c.title}
            icon={c.icon}
            emoji={c.emoji}
            title={c.title}
            description={c.description}
            action={
              <button
                type="button"
                disabled
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-brand/80 px-5 py-2 text-sm font-semibold text-paper opacity-70"
                aria-disabled="true"
                title="Contenido en preparación"
              >
                {c.button} <ArrowRight className="size-4" />
              </button>
            }
          />
        ))}
      </SectionGrid>
    </div>
  );
}
