import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/miembros/PlaceholderPage";

export const Route = createFileRoute("/_authenticated/miembros/principios")({
  component: () => (
    <PlaceholderPage
      eyebrow="Área de miembros"
      title="Nuestros 36 Principios"
      description="Los Doce Pasos, las Doce Tradiciones y los Doce Conceptos de Alcohólicos Anónimos."
    />
  ),
});
