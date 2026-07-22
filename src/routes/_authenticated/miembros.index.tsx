import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/miembros/")({
  component: () => <Navigate to="/miembros/grupos" replace />,
});
