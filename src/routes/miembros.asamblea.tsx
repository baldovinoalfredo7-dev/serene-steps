import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/miembros/asamblea")({
  head: () => ({
    meta: [
      { title: "Asamblea de Área · AA Área 2 Metropolitana" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: () => <Outlet />,
});
