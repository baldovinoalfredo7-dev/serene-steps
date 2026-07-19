import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ServiceShell } from "@/components/service/ServiceShell";

export const Route = createFileRoute("/_authenticated/servicio")({
  head: () => ({
    meta: [
      { title: "Centro de servicio · AA Área 2" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <ServiceShell>
      <Outlet />
    </ServiceShell>
  ),
});
