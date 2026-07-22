import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/miembros/PlaceholderPage";

export const Route = createFileRoute("/_authenticated/miembros/eventos")({
  component: () => (
    <PlaceholderPage
      eyebrow="Área de miembros"
      title="Calendario de eventos"
      description="Próximos foros, aniversarios, congresos y actividades del Área."
    />
  ),
});
