import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/miembros/principios")({
  component: PrincipiosLayout,
});

function PrincipiosLayout() {
  return <Outlet />;
}
