import { createFileRoute, redirect } from "@tanstack/react-router";

// Perfil vive en /perfil (fuera del shell) por ahora.
export const Route = createFileRoute("/_authenticated/servicio/perfil")({
  beforeLoad: () => {
    throw redirect({ to: "/perfil" });
  },
  component: () => null,
});
