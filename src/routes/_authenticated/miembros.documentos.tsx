import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/miembros/PlaceholderPage";

export const Route = createFileRoute("/_authenticated/miembros/documentos")({
  component: () => (
    <PlaceholderPage
      eyebrow="Área de miembros"
      title="Documentos para descargar"
      description="Repositorio de documentos del Área disponibles para los miembros."
    />
  ),
});
