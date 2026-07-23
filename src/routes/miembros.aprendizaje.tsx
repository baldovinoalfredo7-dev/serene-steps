import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/miembros/PlaceholderPage";

export const Route = createFileRoute("/miembros/aprendizaje")({
  component: () => (
    <PlaceholderPage
      eyebrow="Portal para Miembros"
      title="Centro de aprendizaje"
      description="Recursos de formación para miembros y servidores. Esta sección está preparada para incorporar contenido próximamente."
    />
  ),
});
