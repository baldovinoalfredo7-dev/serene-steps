import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/miembros/PlaceholderPage";

export const Route = createFileRoute("/_authenticated/miembros/area")({
  component: () => (
    <PlaceholderPage
      eyebrow="Área de miembros"
      title="El Área y sus servidores"
      description="Estructura del Área 2 Metropolitana y los servidores que la acompañan."
    />
  ),
});
