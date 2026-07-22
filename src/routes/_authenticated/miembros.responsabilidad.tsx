import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/miembros/PlaceholderPage";

export const Route = createFileRoute("/_authenticated/miembros/responsabilidad")({
  component: () => (
    <PlaceholderPage
      eyebrow="Área de miembros"
      title="La Declaración de la Responsabilidad"
      description="Texto y contexto de la Declaración de la Responsabilidad de Alcohólicos Anónimos."
    />
  ),
});
