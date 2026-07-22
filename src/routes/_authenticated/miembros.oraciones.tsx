import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/miembros/PlaceholderPage";

export const Route = createFileRoute("/_authenticated/miembros/oraciones")({
  component: () => (
    <PlaceholderPage
      eyebrow="Área de miembros"
      title="Nuestras oraciones"
      description="Selección de oraciones utilizadas en las reuniones de Alcohólicos Anónimos."
    />
  ),
});
