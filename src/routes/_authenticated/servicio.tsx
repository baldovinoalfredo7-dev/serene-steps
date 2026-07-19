import { createFileRoute, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ServiceShell } from "@/components/service/ServiceShell";
import { getMustChangePassword } from "@/lib/members.functions";

export const Route = createFileRoute("/_authenticated/servicio")({
  head: () => ({
    meta: [
      { title: "Centro de servicio · AA Área 2" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ServiceLayout,
});

function ServiceLayout() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { data } = useQuery({
    queryKey: ["me", "must-change-password"],
    queryFn: () => getMustChangePassword(),
    staleTime: 60_000,
  });

  useEffect(() => {
    if (data?.must && !pathname.startsWith("/reset-password")) {
      navigate({ to: "/reset-password", search: { force: 1 }, replace: true });
    }
  }, [data, pathname, navigate]);

  return (
    <ServiceShell>
      <Outlet />
    </ServiceShell>
  );
}
