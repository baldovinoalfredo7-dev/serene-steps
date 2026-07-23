import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/miembros/")({
  component: () => <Navigate to="/miembros/grupos" replace />,
});
