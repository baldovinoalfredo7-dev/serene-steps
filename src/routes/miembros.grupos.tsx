import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/miembros/PlaceholderPage";

export const Route = createFileRoute("/miembros/grupos")({
  component: () => (
    <PlaceholderPage
      eyebrow="Área de miembros"
      title="Nuestros grupos"
      description="Directorio interno de los grupos del Área 2 Metropolitana."
    />
  ),
});
