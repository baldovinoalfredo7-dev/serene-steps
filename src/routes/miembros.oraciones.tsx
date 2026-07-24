import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/miembros/oraciones")({
  component: OracionesLayout,
});

function OracionesLayout() {
  return <Outlet />;
}
